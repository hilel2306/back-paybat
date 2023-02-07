import express from "express";
import { isLoggedIn } from "../controllers/user.js";
import { billRegistration } from "../controllers/bill.js";




const router = express.Router();


router.post('/registration', isLoggedIn, billRegistration);


export { router as BillRoute };