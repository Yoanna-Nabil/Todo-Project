import { userModel } from "../../db/user.models.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const createUser= async (req, res) => {
    let user= req.body;
    try{
        let newUser= await userModel.create(user);
        res.json({message: 'Done', data: newUser})
    }catch(err){
        res.json({message: err.message});
    }
}

export const getUser= async(req, res) => {
    try{
        let getsUser= await userModel.findOne({firstName: 'yoyo'}, {firstName: 1});
        res.json({message: 'done', getsUser})
        }catch(err){
            res.json({message: err.message});
        }
}

export const updatedUer= async(req, res) => {
    let {userName}= req.body;
    let {id}= req.params;
    try{
        let theUserAfterEdit= await userModel.findByIdAndUpdate(id, {userName}, {new:true});
        res.json({message: 'user was edit successfully', user: theUserAfterEdit});
    }catch(err){
        res.json({message: err.message});
    }
}

export const deletedUser= async(req, res, next) => {
    let {id}= req.params;
    try{
        let theUserDeleted= await userModel.findByIdAndDelete(id);
        res.json({message: 'user was delete successfully', user: theUserDeleted});
    }catch(err){
      next(err);
    }
}

export const login= async(req,res) => {
    let {email, password}= req.body;
    if(!email || !password){
        return res.json({message: "you must provide email and password"});
    }
    let user= await userModel.findOne({email: email});
    if(!user){
        return res.json({message: "invalid email"});
    }
    let isvalid= await bcrypt.compare(password, user.password);
    if(!isvalid){
        return res.json({message: "invalid password"})
    }
    let token= await jwt.sign({data: {email: user.email, id: user.id, role: user.role}}, process.env.jwt_secret, { expiresIn: '24h' });
    res.json({message: "token success", token: token});
};

export const viewUsers= async(req, res) => {
    let users= await userModel.find();
    res.render('user', {data: users})
}