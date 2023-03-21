import { pool } from "../util/database.js";

export const getUser = async (id) => {
    const [rows] = await pool.query(`
    SELECT * FROM user WHERE id = ?`, [id])
    return rows[0]
}

export const createUser = async (name, firstname, email, hash, token, role, expiryDate) => {
    const [result] = await pool.query(`
    INSERT INTO user (name, firstname, email, hash,token, role, expiration_link)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [name, firstname, email, hash, token, role, expiryDate]
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


export const verifyEmail = async (key) => {
    const [result] = await pool.query(`SELECT * FROM user WHERE token = ?`, [key])
    if (result.length > 0) {
        const id = result[0].id
        return getUser(id)
    }
    return false
}


export const setEmailVerify = async (id) => {
    const [result] = await pool.query(`UPDATE user SET email_verify = true WHERE id = ?`, [id])
    return result
}


export const updateUserKey = async (email, key, expiryDate) => {
    const [result] = await pool.query(`UPDATE user SET token = ?,  expiration_link = ? WHERE email = ?`, [key, expiryDate, email])
    return result
}