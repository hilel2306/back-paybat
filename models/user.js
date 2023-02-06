import { pool } from "../util/database.js";

export const getUser = async (id) => {
    const [rows] = await pool.query(`
    SELECT * FROM user WHERE id = ?`, [id])
    return rows[0]
}

export const createUser = async (name, firstname, email, hash, role) => {
    const [result] = await pool.query(`
    INSERT INTO user (name, firstname, email, hash, role)
    VALUES (?, ?, ?, ?, ?)
    `, [name, firstname, email, hash, role]
    )
    const id = result.insertId
    return getUser(id)
}


export const findUserByEmail = async (email) => {
    const [result] = await pool.query(`SELECT * FROM user WHERE email = ?`, [email])
    if (result.length > 0) {
        const id = result[0].id
        return getUser(id)
    }
    return false
}

