import express from "express";
const adminAuthRouter = express.Router();
import {registerAdminUser, loginAdminUser} from "../controller/adminAuthController.js";


adminAuthRouter.post('/register', registerAdminUser)
adminAuthRouter.post('/login', loginAdminUser)


export default adminAuthRouter