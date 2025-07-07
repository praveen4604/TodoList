import mongoose from "mongoose";

export const connectDb=async()=>{
    try{
        mongoose.connect('mongodb url')
        
        console.log("DB connected");

    }
    catch(err){
        console.log("Db connection error",err);
    }
}
