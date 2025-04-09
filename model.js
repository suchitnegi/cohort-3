const mongoose = require('mongoose')
const schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const user = new schema({
    userName: String,
    password: String
})
const User = mongoose.model('Users', user);
module.exports = User