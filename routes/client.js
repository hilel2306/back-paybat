import express from "express";
import { isLoggedIn } from "../controllers/user.js";
import { getClients, getClient, clientRegistration, saveClient } from "../controllers/client.js";




const router = express.Router();

router.get('/get', isLoggedIn, getClients);
router.get('/:id', isLoggedIn, getClient);
router.post('/registration', isLoggedIn, clientRegistration);
router.put('/save', isLoggedIn, saveClient);



export { router as ClientRoute };