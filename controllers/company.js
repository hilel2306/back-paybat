import { createCompany, findCompanyByEmail } from "../models/company.js";



// export const companyRegistration = async (req, res, next) => {
//     const { userEmail, legalstatus, name, email, adress, phone } = req.body
//     try {
//         const companyExists = await findCompanyByEmail(email);
//         if (!companyExists) {
//             const company = await createCompany(userEmail, legalstatus, name, email, adress, phone);
//             return res.send(company)
//         }
//         return res.send("This company already exists")
//     } catch (error) {
//         console.error(error.message);
//     }
// }
