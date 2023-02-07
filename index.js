import express from "express";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
dotenv.config();
import { UserRoute } from "./routes/user.js";
import { CompanyRoute } from "./routes/company.js";
import { BillRoute } from "./routes/bill.js";





app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());



app.use('/user', UserRoute)
app.use('/company', CompanyRoute)
app.use('/bill', BillRoute)




app.listen(process.env.PORT, () => {
    console.log("Server has started");
});