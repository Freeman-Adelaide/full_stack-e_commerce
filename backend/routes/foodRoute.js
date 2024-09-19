import express from 'express';
import { addFood, listFood, removeFood } from '../controller/foodController.js';
import multer from 'multer';
import adminAuthMiddleware from '../middleware/adminAuth.js';

const foodRouter = express.Router();

//Image Storage Engine

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage: storage})

foodRouter.post('/add', adminAuthMiddleware, upload.single("image"), addFood)
foodRouter.get('/list', adminAuthMiddleware, listFood)
foodRouter.post('/remove', adminAuthMiddleware, removeFood)





export default foodRouter