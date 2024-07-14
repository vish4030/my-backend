
import { addUser, login } from "../db/userSchema.js";


export const registerUser = async(req,res)=>{
    let temp = await addUser(req.body);
    res.send(temp);
}

export const userLogin = async(req, res)=>{
    let result = await login(req.body);
    res.send(result);
}