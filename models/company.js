import { pool } from "../util/database.js";



export const getCompanyById = async (id) => {
    const [rows] = await pool.query(`
    SELECT * FROM company WHERE id = ?`, [id])
    return rows[0]
}
export const createCompany = async (userEmail, legalstatus, name, email, adress, phone) => {
    const [result] = await pool.query(`
    INSERT INTO company (legalstatus, name, email, adress, phone)
    VALUES (?, ?, ?, ?, ?)
    `, [legalstatus, name, email, adress, phone]
    )
    const id = result.insertId
    await pool.query(`UPDATE user SET company_id = ? WHERE email = ?`, [id, userEmail])
    return getCompanyById(id)
}

export const findCompanyByEmail = async (email) => {
    const [result] = await pool.query(`SELECT * FROM company WHERE email = ?`, [email])
    if (result.length > 0) {
        const id = result[0].id
        return getCompanyById(id)
    }
    return false
}
