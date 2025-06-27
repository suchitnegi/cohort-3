import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import userModel from './db';

const app = express();

mongoose.connect('mongodb+srv://suchitnegi:47M7NzCvubjHxogX@100xdev.ijylxgs.mongodb.net/brainly')
app.use(express.json())
app.post("/api/v1/signup",async (req,res)=>{
    const userData = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    })

    await userData.save();
    res.json({message: "done"});
})
app.post("/api/v1/signin",(req,res)=>{
})
app.post("/api/v1/content",(req,res)=>{
    
})
app.get("/api/v1/content",(req,res)=>{
    
})
app.delete("/api/v1/content",(req,res)=>{
    
})

function main(){
    app.listen(9090);
    console.log("BE running in 9090")
}
main();
