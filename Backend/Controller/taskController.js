import Task from "../Model/taskModel.js";


const createtask=async(req,res)=>{
    try{
        const{title,description,priority,dueDate,completed}=req.body;
        const task=new Task({
            title,description,priority,dueDate,
            completed: completed==='Yes'|| completed===true,
            owner:req.user.id
        });
        const saved=await task.save();
        res.status(201).json({success:true,task:saved});
    }
    catch(err){
        res.status(400).json({success:false,message:err.message});
    }
};


const gettask=async(req,res)=>{
    try{
        const tasks=await Task.find({owner:req.user.id}).sort({createdAt:-1});
        res.json({success:true,tasks});
    }
    catch(err){
        res.status(400).json({success:false,message:err.message});
    }
}

const gettaskbyid=async(req,res)=>{
    try{
        const task=await Task.find({_id:req.params.id,owner:req.user.id})
        if(!task){
            return res.status(404).json({success:false,message:"Not Found"});
        }
        res.json({success:true,task});
    }
    catch(err){
        res.status(400).json({success:false,message:err.message});
    }
}
const updateTask=async(req,res)=>{
    try{
        const data={...req.body}
        if(data.completed!==undefined){
            data.completed=data.completed==='Yes'|| data.completed===true
        }
        const updated=await Task.findOneAndUpdate({_id:req.params.id,owner:req.user.id }
            ,data,{new:true}
        );
        if(!updated){
            return res.status(404).json({success:false,message:"Task not found or not yours"})
        }
        res.json({success:true,task:updated})
    }
      catch(err){
        res.status(400).json({success:false,message:err.message});
    }
}
const deletetask=async(req,res)=>{
    try{
        const deleted = await Task.findOneAndDelete({_id:req.params.id,owner:req.user.id})
        if(!deleted)
            return res.status(404).json({success:false,message:"Task not found or not yours"})
        res.json({success:true,message:"Task Deleted"})
    }
     catch(err){
        res.status(400).json({success:false,message:err.message});
    }
}
const tasks={deletetask,updateTask,createtask,gettask,gettaskbyid}
export default tasks