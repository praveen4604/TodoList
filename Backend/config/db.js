import mongoose from "mongoose";

export const connectDb=async()=>{
    try{
        mongoose.connect('mongodb+srv://NCET:NCET_123@cluster0.7yb8v.mongodb.net/TodoList?retryWrites=true&w=majority&appName=Cluster0')
        
        console.log("DB connected");

    }
    catch(err){
        console.log("Db connection error",err);
    }
}
