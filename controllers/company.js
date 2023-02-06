import { createCompany } from "../models/company.js";



export const companyRegistration = async (req, res, next) => {
    const { userEmail, legalstatus, name, email, adress, phone } = req.body
    try {
        const company = await createCompany(userEmail, legalstatus, name, email, adress, phone);
        return res.send(company)
    } catch (error) {
        console.error(error.message);
    }
}
