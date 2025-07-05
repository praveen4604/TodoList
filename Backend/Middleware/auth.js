import jwt from 'jsonwebtoken'
import User from '../Model/User.js'
const JWT_SECRET=process.env.JWT_SECRET;
const authmiddlware=async(req,res,next)=>{
    const authHeader=req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({success:false,message:"Not Authorized Token Missing"})
    }
    const token=authHeader.split(' ')[1];
    try{
         const load=jwt.verify(token,JWT_SECRET);
         const user=await User.findById(load.id).select('-password');
         if(!user){
            return res.status(401).json({success:false,message:"User not found"});
         }
         req.user=user;
         next();
    }
    catch(err){
        console.log("JWT verification failed",err);
        return res.status(401).json({success:false,message:"Token invalid or expired"})
    }
}
export default authmiddlware