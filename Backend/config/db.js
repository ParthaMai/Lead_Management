import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://parthamaity2004_db_user:9883737708@cluster0.jhdxiok.mongodb.net/lead-management').then(()=>console.log("DB Connected"));
}