require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const {userRouter} = require('./routes/user.js')
const {courseRouter} = require('./routes/course.js')
const {adminRouter} = require('./routes/admin.js')
const {MONGO_DB_STRING} = require('./config.js')
const app = express();
mongoose.connect(MONGO_DB_STRING)

app.use(express.json());

app.use('/api/v1/user',userRouter);
app.use('/api/v1/course',courseRouter);
app.use('/api/v1/admin',adminRouter);

function main(){
    app.listen(3030)
    console.log("app running on 3030")   
}

main()