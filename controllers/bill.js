import { createBill } from "../models/bill.js";

export const billRegistration = async (req, res, next) => {
    const { status, title, companyId } = req.body
    try {
        const bill = await createBill(status, title, companyId);
        return res.send(bill)
    } catch (error) {
        console.error(error.message);
    }
}