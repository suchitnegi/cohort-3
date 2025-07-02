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
export const userModel = mongoose.model("User",user)

const content  = new mongoose.Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    userId: {type: mongoose.Types.ObjectId, ref: 'User', require: true}
})

export const contentModel = mongoose.model('Content', content);

const link  = new mongoose.Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', require: true, unique: true}
})

export const linkModel = mongoose.model('link', link);

