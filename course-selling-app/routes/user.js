const { Router } = require("express")
const userRouter = Router();
const { userModel, courseModel, purchaseModel } = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_USER_SECRET} = require('./../config');
const { userMiddleware } = require("../middleware/user");
const course = require("./course");


userRouter.post('/signup', async function (req, res) {

    const { firstName, lastName, email, password } = req.body;
    const alreadyExist = await userModel.findOne({ email: email })
    if (alreadyExist) {
        res.json({
            message: "user already exist with this email"
        })
    }
    bcrypt.hash(password, 2, async function (err, hash) {
        await userModel.create({
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

userRouter.get('/signin', async function (req, res) {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email })
    if (!user) {
        res.json({
            message: "user not exsit with this email"
        })
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
        const token = jwt.sign({ userId: user._id }, JWT_USER_SECRET)
        res.json({
            message: "logged in",
            token: token
        })
    }
})
userRouter.get('/purchases',userMiddleware,async function (req, res) {
    const userId = req.userId;
    const courses = await purchaseModel.find({
        userId: userId
    })
    const courseDetail =await courseModel.find({_id: {
        $in: courses.map(m => m.courseId)
    }})
    res.json(
        {
            message: "purchase endpoint",
            courses: courses,
            courseDetail: courseDetail
        }
    )
})

module.exports = {
    userRouter: userRouter
}