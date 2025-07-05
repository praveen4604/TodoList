import mongoose from "mongoose";
const taskschema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },description:{
        type:String,
        default:''
    },
    priority:{
        type:String,
        enum:['Low','Medium','High'],default:'Low'
    },
    dueDate:{
        type:Date,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,ref:'User',required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
const task=mongoose.model('Tasks',taskschema);
export default task