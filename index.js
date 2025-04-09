const mongoose = require('mongoose')
const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('./model.js')
const {userRouter} = require('./routes/user.js')
const {courseRouter} = require('./routes/course.js')

const app = express();
mongoose.connect('mongodb+srv://suchitnegi:47M7NzCvubjHxogX@100xdev.ijylxgs.mongodb.net/course-selling-app')

app.use(express.json());

app.use('/user',userRouter);
app.use('/course',courseRouter);

app.listen(3030)