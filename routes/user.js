import express from "express";
import { signup, login, isLoggedIn, logout, confirmEmail } from "../controllers/user.js";


const router = express.Router();

router.get('/data', isLoggedIn);

router.get('/:token', confirmEmail)

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);


export { router as UserRoute };
