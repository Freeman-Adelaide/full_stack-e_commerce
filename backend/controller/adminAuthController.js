import adminUserModel from "../models/adminUserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login admin user
export const loginAdminUser = async(req, res) => {
    const { email, password } = req.body;
    try {
        const adminUser = await adminUserModel.findOne({email});

        if(!adminUser){
            return res.json({success: false, message: "This admin does not exist"})
        }

        const isMatch = await bcrypt.compare(password, adminUser.password)

        
        if (!isMatch) {
            return res.json({success: false, message: "Incorrect password"})
        }

        const adminToken = createToken(adminUser._id);
        res.json({success: true, adminToken})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error occurred in the adminAuthController | loginAdminUser function"})        
    }
}


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_ADMIN_SECRET)
}

//register admin user
export const registerAdminUser = async (req, res) => {
    const { name, email, password } = req.body;

    console.log('Received data:', { name, email, password });

    try {
        //checking if the admin already exists
        const exists = await adminUserModel.findOne({email})
        if(!exists){
            return res.json({success: false, message: "This admin already exists"})
        }

        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Please enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success: false, message: "Please enter a strong password"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newAdminUser = new adminUserModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const adminUser = await newAdminUser.save()
        const adminToken = createToken(adminUser._id)
        res.json({success: true, adminToken})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error occurred in the adminAuthController | registerAdminUser function"})
    }
}