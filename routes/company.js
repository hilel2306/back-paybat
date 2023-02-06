import express from "express";
import { companyRegistration } from "../controllers/company.js";
import { isLoggedIn } from "../controllers/user.js";


const router = express.Router();


router.post('/registration', isLoggedIn, companyRegistration);


export { router as CompanyRoute };
