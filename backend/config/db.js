import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://food_delivery_app:guEdit7gytK3Lvni@cluster0.mwtjlta.mongodb.net/food-del')
        .then(() => console.log('DB connected'))
}

