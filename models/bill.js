import { pool } from "../util/database.js";



export const getBillbyId = async (id) => {
    const [rows] = await pool.query(`
    SELECT * FROM bill WHERE id = ?`, [id])
    return rows[0]
}
export const createBill = async (status, title, companyId) => {
    const [result] = await pool.query(`
    INSERT INTO bill (status, title, company_id)
    VALUES (?, ?, ?)
    `, [status, title, companyId]
    )
    const id = result.insertId
    // await pool.query(`UPDATE user SET company_id = ? WHERE email = ?`, [id, userEmail])
    return getBillbyId(id)
}

// export const findCompanyByEmail = async (email) => {
//     const [result] = await pool.query(`SELECT * FROM company WHERE email = ?`, [email])
//     if (result.length > 0) {
//         const id = result[0].id
//         return getCompany(id)
//     }
//     return false
// }
