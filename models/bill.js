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
    return getBillbyId(id)
}



export const getBills = async (companyId) => {
    const [rows] = await pool.query(`SELECT * FROM bill WHERE company_id = ?`, [companyId])
    return rows
}



export const updateBill = async (obj) => {
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

    const stringSql = `UPDATE bill SET ${stringPropertyToSet} WHERE id = ?`
    console.log(stringPropertyToSet)
    const [result] = await pool.query(stringSql, arrayPropertiesValues)

    return getBillbyId(obj.id)

}

