import { pool } from "../util/database.js";



export const getClientById = async (id) => {
    const [rows] = await pool.query(`
    SELECT * FROM client WHERE id = ?`, [id])
    return rows[0]
}


export const getAllClients = async (companyId) => {
    const [rows] = await pool.query(`SELECT * FROM client WHERE company_id = ?`, [companyId])
    return rows
}


export const createClient = async (name, firstname, phone, company_id) => {
    const [result] = await pool.query(`
    INSERT INTO client (name, firstname, phone, company_id)
    VALUES (?, ?, ?, ?)
    `, [name, firstname, phone, company_id]
    )
    const id = result.insertId
    return getClientById(id)
}

export const updateClient = async (obj) => {
    delete obj.company_id;

    const keysArray = Object.keys(obj)
    let arrayPropertiesValues = [];
    let stringPropertyToSet = ``;

    for (let i = 1; i < keysArray.length; i++) {
        if (i === keysArray.length - 1) {
            stringPropertyToSet = stringPropertyToSet + keysArray[i] + ` = ? `
        } else {
            stringPropertyToSet = stringPropertyToSet + keysArray[i] + ` = ?, `
        }
    }

    for (let property in obj) {
        arrayPropertiesValues.push(obj[property])
    }

    arrayPropertiesValues.shift();
    arrayPropertiesValues.push(obj.id);

    const stringSql = `UPDATE client SET ${stringPropertyToSet} WHERE id = ?`

    const [result] = await pool.query(stringSql, arrayPropertiesValues)

    return getClientById(obj.id)

}
