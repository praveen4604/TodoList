import express from "express"
const router=express.Router();
import authMiddleware from "../Middleware/auth.js"
import Controller from "../Controller/userController.js"


//Public links
router.post('/register',Controller.Register);
router.post('/login',Controller.Login);


router.get('/current',authMiddleware,Controller.getcurrentuser);
router.put('/update',authMiddleware,Controller.Update);
router.put('/updatepassword',authMiddleware,Controller.updatepassword);

export default router