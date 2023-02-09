import { createBill, getBills, updateBill } from "../models/bill.js";

export const billRegistration = async (req, res, next) => {
    const { status, title, companyId } = req.body
    try {
        const bill = await createBill(status, title, companyId);
        return res.status(201).json(bill)
    } catch (error) {
        console.error(error.message);
    }
}

export const getAllbills = async (req, res) => {
    const companyId = req.query.companyId
    try {
        const bills = await getBills(companyId)
        return res.status(201).json(bills)
    } catch (error) {
        console.error(error.message);
    }
}

export const saveBill = async (req, res) => {
    try {
        const bill = await updateBill(req.body)
        return res.status(201).json(bill)

    } catch (error) {
        console.error(error.message)
    }
}