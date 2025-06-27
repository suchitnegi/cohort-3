import mongoose from 'mongoose'

const user  = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email:{
        type: String,
        unique: true
    },
    password: String,
})

const userModel = mongoose.model("user",user)

export default userModel;