import express from "express"
import cors from "cors"
import {connectDb} from "./config/db.js"
import "dotenv/config"
import userRouter from '../Backend/Routes/userroutes.js'
import taskRouter from '../Backend/Routes/taskRoutes.js'
const Port= 5000;

const app=express()
app.use(express.json())                    
app.use(cors())
connectDb();


//Routes
app.use('/api/user',userRouter)
app.use('/api/task',taskRouter);

app.get('/',(req,res)=>{
    res.send("api is working");
})

app.listen(Port,()=>{
    console.log(`server is working on port ${Port}`);
})
