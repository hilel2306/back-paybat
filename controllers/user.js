import { createUser, findUserByEmail, setEmailVerify, updateUserKey, verifyEmail } from "../models/user.js";

import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


////////// SENDIBLUE ////////
import SibApiV3Sdk from 'sib-api-v3-sdk';
import { createCompany } from "../models/company.js";
var defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY_SENDIBLUE;


var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email


dotenv.config();





export const signup = async (req, res, next) => {
    const { name, firstname, email, password } = req.body

    try {
        const userExists = await findUserByEmail(email);
        if (!userExists) {

            const role = 'admin';
            const hash = await bcrypt.hash(password, 13)
            const token = await bcrypt.hash(email + password, 13);
            const expiryDate = new Date(Date.now() + 60 * 60 * 200) //  10min
            console.log(new Date(expiryDate))
            const user = await createUser(name, firstname, email, hash, token, role, expiryDate);
            const userCompany = await createCompany(user.id, user.email)

            //_______________________________________________________________//

            sendSmtpEmail = {
                to: [{
                    email: email,
                    name: name
                }],
                templateId: 2,
                params: {
                    name: name,
                    surname: "",
                    link: `http://localhost:${process.env.PORT}/user/confirm?key=${token}`
                },
                headers: {
                    'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
                }
            };

            apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
                console.log('API called successfully. Returned data: ' + data);
            }, function (error) {
                console.error(error);
            });

            //___________________________________________________________________//
            return res.send({ user: user, company_user: userCompany })
        }
        return res.send("This user already exists")
    } catch (error) {
        console.error(error.message);
    }
}

export const confirmEmail = async (req, res) => {
    const { key } = req.query
    console.log(key)
    const date = new Date(Date.now());
    try {
        const user = await verifyEmail(key)
        if (!user) {
            return res.status(401).json({ message: "Invalid link" })
        }
        const { expiration_link } = user
        if (date > expiration_link) {
            return res.status(401).json({ message: "Expired link" })
        }
        const confirmedEmail = await setEmailVerify(user.id)
        return res.status(201).json({
            message: "CONFIRMED EMAIL",
            result: confirmedEmail
        })
    } catch (error) {
        console.error(error.message)
    }
    // console.log("OK")
}


export const login = async (req, res, next) => {
    const { email, password } = req.body
    const expiryDate = new Date(Date.now() + 60 * 60 * 24000) // 24 hours
    try {
        const user = await findUserByEmail(email)
        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }
        const isValid = await bcrypt.compare(password, user.hash)
        if (!isValid) {
            return res.status(401).json({ message: "Wrong password" })
        }
        if (!user.email_verify) {
            const key = await bcrypt.hash(email + password, 13);
            const expiryDateLink = new Date(Date.now() + 60 * 60 * 200) //  10min

            await updateUserKey(email, key, expiryDateLink)

            //_______________________________________________________________//

            sendSmtpEmail = {
                to: [{
                    email: email,
                    name: user.name
                }],
                templateId: 2,
                params: {
                    name: user.name,
                    surname: "",
                    link: `http://localhost:${process.env.PORT}/user/confirm?key=${key}`
                },
                headers: {
                    'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
                }
            };

            apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
                console.log('API called successfully. Returned data: ' + data);
            }, function (error) {
                console.error(error);
            });

            //___________________________________________________________________//

            return res.status(401).json({ message: "EMAIL NOT CONFIRMED, check your email please." })

        }
        res.cookie("cookieToken", jwt.sign({ email: email }, process.env.JWTSECRET), { httpOnly: true, expires: expiryDate })

        return res.status(201).json({ message: "Successfully registered" })

    } catch (error) {
        console.error(error.message);
    }

}

export const logout = (req, res, next) => {
    res.clearCookie("cookieToken");
    return res.status(201).json({ message: "cookies deleted" })
}

export const isLoggedIn = (req, res, next) => {
    try {
        jwt.verify(req.cookies.cookieToken, process.env.JWTSECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" })
            } else {
                next()
            }
        })
    } catch (error) {
        console.error(error.message)
    }
}