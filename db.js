const mongoose = require('mongoose')
const {Schema, ObjectId}  = require('mongoose')

const user = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
})  
const admin = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
}) 
const course = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
}) 

const purchase = new Schema({
    user:ObjectId,
    courseId: ObjectId
})

const adminModel = mongoose.model("admin",admin)
const userModel = mongoose.model("user",user)
const courseModel = mongoose.model("course",course)
const purchaseModel = mongoose.model("purchase",purchase)

module.exports = {
    adminModel: adminModel,
    userModel: userModel,
    courseModel: courseModel,
    purchaseModel: purchaseModel
}