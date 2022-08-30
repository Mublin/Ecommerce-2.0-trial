import bcrypt from "bcryptjs";
import express from "express";
import expressAsyncHandler from "express-async-handler"
import User from "../models/userModel.js";
import { generateToken, isAuth } from "../utils.js";

const userRouter= express.Router();

userRouter.post('/signin', expressAsyncHandler( async (req, res)=>{
    const { email, password } = req.body
    const user = await User.findOne({email})
    if(user){
        if (bcrypt.compareSync(password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            })
            return;
        }
    }
    res.status(401).send({ message: "Invalid email or password"})
}))


userRouter.post('/signup', expressAsyncHandler( async(req, res)=>{
   const {name, password, email} = req.body
    const newUser = new User({
        name,
        email,
        password: bcrypt.hashSync(password)
        // this is how it is pass to the userModel
    });
    const user = await newUser.save();
    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user)
    })
}))

userRouter.put("/profile", isAuth, expressAsyncHandler( async (req, res)=>{
    const {_id} = req.user;
    const user = await User.findById(_id)
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password){
            user.password = bcrypt.hashSync(req.body.password, 8);
        }

        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser)
        })
    }
    else{
        res.status(404).send({ message: "User not Found"})
    }
}))

export default userRouter;