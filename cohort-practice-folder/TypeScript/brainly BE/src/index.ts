import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { userModel, contentModel, linkModel } from './db';
import { middleware } from './middleware';

import bcrypt from 'bcrypt';
import { randomStringGenerator } from './utils';


const app = express();

mongoose.connect('mongodb+srv://suchitnegi:47M7NzCvubjHxogX@100xdev.ijylxgs.mongodb.net/brainly')
app.use(express.json())
app.post("/api/v1/signup",async (req,res)=>{
    const {firstName, lastName, email, password} = req.body;
    const alreadyAccount = await userModel.findOne({email: email})
    if(alreadyAccount){
        res.json({
            message: "account already exist"
        }
        )
    }
    bcrypt.hash(password, 2 ,async function (err, hash){
        await userModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash
        })
    } )
 
    res.json({message: "signup is done"});
})
app.post("/api/v1/signin",async (req,res)=>{
    const {email, password} = req.body;
    const user = await userModel.findOne({email: email});
    console.log("user",user);
    if(!user){
        res.json({
            message: "user not found"
        })
    }
    let match = false;
    if(user?.password){
     match = await bcrypt.compare(password, user.password);
    }
    if(!match){
        res.json({message: "password incorrect"});
    }

    const token = jwt.sign({
        email: email,
        userId: user?._id,
      }, 'secret', { expiresIn: '1h' });
    res.json({
        message: "login",
        token: token
    })
    
})
app.post("/api/v1/content",middleware,async (req,res)=>{
    const {title, link} = req.body;

    await contentModel.create({
        title: title,
        link: link,
        //@ts-ignore
        userId: req.userId,
    })
    res.json({
        message: "content posted"
    })
})
app.get("/api/v1/content",middleware,async (req,res)=>{
    // @ts-ignore
    const userId = req.userId
    const content = await contentModel.find({userId: userId}).populate("userId","firstName lastName")

    res.json({
        message: "content fetched",
        content: content
    })
    
})
app.delete("/api/v1/content",middleware, async(req,res)=>{
    const contentId = req.query.contentId;
    await contentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    })

    res.json({
        message: "deleted content"
    })
})
app.post("/api/v1/brainly/share",middleware,async (req,res)=>{

    const share= req.body.share;
    if(share){
        const hash = randomStringGenerator(10);
        await linkModel.create({
            hash: hash,
             //@ts-ignore
            userId: req.userId
        })
        res.json({
            message: "/share/" + hash
        })
        return
    }
    else{
        await linkModel.deleteOne({
             //@ts-ignore
            userId: req.userId
        });

        res.json({
            message: "removed link"
        })
        return
    }

})
app.delete("/api/v1/brainly/:shareLink",middleware, async(req,res)=>{
   
    const shareLink = req.params.shareLink;

    const linkData = linkModel.findOne({
        hash: shareLink
    })

    if(!linkData){
        res.json({
            message: "link not valid"
        })
        return
    }
    //@ts-ignore
    const userId = linkData.userId;
    const userContent = await contentModel.find({
        userId: userId
    })

    res.json({
        message: "constent fetch done",
        content: userContent
    })
})

function main(){
    app.listen(9090);
    console.log("BE running in 9090")
}
main();
