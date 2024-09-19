import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    
       // Check if all required fields are present
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success: false, message: "User does not exist"})
        }
        
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({success: false, message: "Incorrect password"})
        }

        const token = createToken(user._id);
        res.json({success: true, token})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

       // Check if all required fields are present
       if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        //checking if the user already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.status(400).json({success: false, message: "User already exists"})
        }

        //validating email format and strong password
        if (!email || typeof email !== 'string') {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        if(password.length < 8){
            return res.status(400).json({success: false, message: "Please enter a strong password"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.status(201).json({success: true, token})

    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Error"})
    }
}

export { loginUser, registerUser }