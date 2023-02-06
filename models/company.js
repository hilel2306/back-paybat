import { pool } from "../util/database.js";



export const getCompany = async (id) => {
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
    return getCompany(id)
}

