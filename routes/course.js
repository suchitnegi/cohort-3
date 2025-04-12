const {Router} = require('express')
const courseRouter = Router();
const {purchaseModel, courseModel} = require('./../db')
const {adminMiddleware} = require('./../middleware/admin')
const {userMiddleware} = require('./../middleware/user')

courseRouter.get('/preview', async function (req, res) {
    const course = await courseModel.find({})
    if(course){
        res.json({
            course: course
        })
    }
    else{
        res.json({
            message: "no course available"
        })
    }
})
courseRouter.post('/purchase', userMiddleware,async function (req, res) {
    const { courseId} = req.body;
    const userId = req.userId;
    await purchaseModel.create({
        userId: userId,
        courseId: courseId
    })
    res.json(
        {
            message: "course purchase"
        }
    )
})

module.exports = {
    courseRouter: courseRouter
}