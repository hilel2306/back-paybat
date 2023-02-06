import { createUser, findUserByEmail } from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();





export const signup = async (req, res, next) => {
    const { name, firstname, email, password } = req.body
    const role = 'admin';
    const hash = await bcrypt.hash(password, 13)
    try {
        const userExists = await findUserByEmail(email);
        if (!userExists) {
            const user = await createUser(name, firstname, email, hash, role);
            return res.send(user)
        }
        return res.send("This user already exists")
    } catch (error) {
        console.error(error.message);
    }
}


export const login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await findUserByEmail(email)
        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }
        const isValid = await bcrypt.compare(password, user.hash)
        if (!isValid) {
            return res.status(401).json({ message: "Wrong password" })
        }
        res.cookie("cookieToken", jwt.sign({ email: email }, process.env.JWTSECRET), { httpOnly: true })
        return res.status(201).json({ message: "Successfully registered" })

    } catch (error) {
        console.error(error.message);
    }

}

// export const isLoggedIn = async (req, res, next) => {



// }