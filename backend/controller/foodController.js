import foodModel from "../models/foodModel.js";
import fs from 'fs';
import adminUserModel from '../models/adminUserModel.js'

//add food item
const addFood = async (req, res) => {
    
    try{
         console.log(`This is the user's id extracted from the JWT ${req.user.id}`)
          // Check if the image file was uploaded
          if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        let image_filename = `${req.file.filename}`;

        // Access user ID from the JWT (optional, if needed)
        const userId = req.user.id;
        const user = await adminUserModel.findById(userId)
        if(!user) {
            return res.status(400).json({ success: false, message: "Admin not found" })
        }

        //Create the food 
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename,
            addedBy: userId  
        })

        await food.save();
        res.json({success: true, message: "Food Added"})
    }catch(error){  
        console.log(error)
        res.json({success: false, message: "Error"});
    }
}

//all food list
const listFood = async (req, res) => {
    
    try{

        // Access user ID from the JWT (optional, if needed)
        const userId = req.user.id;
        const user = await adminUserModel.findById(userId)
        if(!user) {
            return res.status(400).json({ success: false, message: "Admin not found" })
        }
        
        const foods = await foodModel.find({});
        res.json({success: true, data: foods})
    }catch(error){
        console.log(error)
        res.json({sucess: false, message: "Error"})
    }
}

//remove food item

const removeFood = async (req, res) => {

    try {
        
        // Access user ID from the JWT (optional, if needed)
        const userId = req.user.id; 
        const user = await adminUserModel.findById(userId)
        if(!user) {
            return res.status(400).json({ success: false, message: "Admin not found" })
        }

        //removing the foods from the list
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`, () => {})
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: "Food Removed"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

export {addFood, listFood, removeFood} 