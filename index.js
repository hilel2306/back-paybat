import express from "express";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
dotenv.config();
import { UserRoute } from "./routes/user.js";


app.use(cors());
app.use(bodyParser.json());


app.use('/user', UserRoute)


app.listen(process.env.PORT, () => {
    console.log("Server has started");
});