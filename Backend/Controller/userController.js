import User from "../Model/User.js"
import validator from "validator"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import "dotenv/config"
const JWT_SECRET=process.env.JWT_SECRET;
// const Token_expires='24h';
const createToken=(userid)=>{
   return jwt.sign({id:userid},JWT_SECRET,{expiresIn:14400});
}
//Register
const Register=async(req,res)=>{
    const{name,email,password}=req.body;
     if(!name || !email || !password){
        return res.status(400).json({message:"All feilds are Required"});
     }
     if(!validator.isEmail(email)){
        return res.status(400).json({message:"Inavlid Email"})
     }
     if(password.length <8){
        return res.status(400).json({message:"Password must be 8 characters"})
     }
     try{
        if(await User.findOne({email})){
            return res.status(409).json({message:"User already Exsists"});
        }
        const hashed=await bcrypt.hash(password,10)
        const user =await User.create({name,email,password:hashed})
        const token=createToken(user._id);
        res.status(201).json({message:"User Created Succesfully",success:true,token,user:{id:user._id,name:user.name,email:user.email}})

      }
     catch(err){
        console.log(err);
        res.status(500).json({message:"server error"});
     }
}
//Login
const Login=async(req,res)=>{
    const{email,password}=req.body;
     if( !email || !password){
        return res.status(400).json({message:"Email and Password Required"});
     }
      if(!validator.isEmail(email)){
        return res.status(400).json({message:"Inavlid Email"})
     }
    try{
        const user= await User.findOne({email})
        if(!user){
          return  res.status(201).json({message:"User doesn't exsits"})
        }
        const match= await bcrypt.compare(password,user.password)
        if(!match){
            return  res.status(201).json({message:"Invalid Password"})
        }
        const token=createToken(user._id);
        res.json({messgae:"Login Succesfull",success:true,token,user:{id:user._id,name:user.name,email:user.email}})
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"server error"});
    }
}
// get Current user
const getcurrentuser=async(req,res)=>{
    try{
const user=await User.findById(req.User.id).select("naem email")
if(!user){
    return  res.status(201).json({message:"User doesn't exsits"})
}
 res.status(400).json({success:true,user})
    }
     catch(err){
        console.log(err);
        res.status(500).json({message:"server error"});
    }
}

//Update user
const Update =async(req,res)=>{
const{name,email}=req.body
  if( !email || !name){
        return res.status(400).json({message:"Email and name Required"});
     }
     if(!validator.isEmail(email)){
        return res.status(400).json({message:"Inavlid Email"})
     }
     try{
        const exists=await User.findOne({email,_id:{$ne : req.user.id}})
        if(exists){
            return res.status(409).json({message:"Email already  in use by another Account"});
        }
        const user=await User.findByIdAndupdate(
            req.user.id,
            {name,email},
            {new:true,select:"name email"}
        )
        res.json({success:true,user})
     }
      catch(err){
        console.log(err);
        res.status(500).json({message:"server error"});
    }
}
// Update Passsword
const updatepassword=async()=>{
    const{currentpassword,newpassword}=req.body;
    if(!currentpassword || !newpassword || newpassword.length<8){
        return res.json({success:false,message:"enter the password "})
    }
    try{
        const user=await User.findOne(req.user.id).select("password");
    if(!user){
return res.status(401).json({message:"user not found"})}
const match=await bcrypt.compare(currentpassword,User.password);
if(!match){
    return res.status( 401).json({message:"current password is incorrect"})
}
user.password=await bcrypt.compare(newpassword,10)
await User.save();
res.json({success:true,message:"password changed"})
    }
 catch(err){
        console.log(err);
        res.status(500).json({message:"server error"});
    }
}
const Controller={updatepassword,Update,Register,Login,getcurrentuser}
export default Controller