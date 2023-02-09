import express from "express";
import { isLoggedIn } from "../controllers/user.js";
import { billRegistration, getAllbills, getBill, saveBill } from "../controllers/bill.js";




const router = express.Router();

router.get('/get', isLoggedIn, getAllbills);
router.get('/:id', isLoggedIn, getBill);
router.post('/registration', isLoggedIn, billRegistration);
router.put('/save', isLoggedIn, saveBill);


export { router as BillRoute };