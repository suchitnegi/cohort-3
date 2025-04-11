const { Router } = require('express')
const adminRouter = Router();
const { adminModel, courseModel } = require('./../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_ADMIN_SECRET } = require('./../config')
const {adminMiddleware} = require('./../middleware/admin');
const course = require('./course');


adminRouter.post('/signup', async function (req, res) {

    const { firstName, lastName, email, password } = req.body;
    const alreadyExist = await adminModel.findOne({ email: email })
    if (alreadyExist) {
        res.json({
            message: "user already exist with this email"
        })
    }
    bcrypt.hash(password, 2, async function (err, hash) {
        await adminModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash
        })
    });

    res.json(
        {
            message: "signup done"
        }
    )
})

adminRouter.post('/signin', async function (req, res) {
    const { email, password } = req.body;
    const user = await adminModel.findOne({ email: email })
    if (!user) {
        res.json({
            message: "user not exsit with this email"
        })
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
        const token = jwt.sign({ userId: user._id }, JWT_ADMIN_SECRET)
        res.json({
            message: "logged in",
            token: token
        })
    }
})
adminRouter.post('/course',adminMiddleware,async function (req, res) {
    const {title,description,price,imageUrl} = req.body;
    
    const userId = req.userId;

    const course = await courseModel.create({
        title: title, description: description, price: price, imageUrl: imageUrl, creatorId: userId
    })

    res.json(
        {
            message: "course created",
            courseId: course._id
        }
    )
})
adminRouter.put('/course',adminMiddleware,async function (req, res) {
    const {title,description,price,imageUrl, courseId} = req.body;
    const userId = req.userId

    const check = courseModel.findOne({
        courseId: courseId,
        creatorId: userId
    })

    if(!check){
        res.json({
            message: "you cannot access this code"
        })
    }

    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: userId
    },{
        title, description, price, imageUrl
    })


    res.json(
        {
            message: "course updated",
            courseId: course._id
        }
    )
})
adminRouter.get('/course/bulk',adminMiddleware, async function (req, res) {

    const userId = req.userId;
    const result = await courseModel.find({creatorId: userId})
    if(result.length < 1){
        res.json({
            message: "no course created"
        })
    }
    res.json(
        {
            message: "get course",
            courses: result
        }
    )
})

module.exports = {
    adminRouter: adminRouter
}

