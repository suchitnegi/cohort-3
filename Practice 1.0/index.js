const express = require('express');
const { UserModel, TodoModel } = require('./db.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.connect('mongodb+srv://suchitnegi:47M7NzCvubjHxogX@100xdev.ijylxgs.mongodb.net/practice')
const app = express();
app.use(express.json());

app.post('/signup',async (req, res) => {
    const { name, email, password } = req.body;
    const response = await UserModel.findOne({ email: email })
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({ name: name, email: email, password: hashedPassword });
        res.json({message: "You are logged in"})

    } catch(e){
        console.log("error caught",e);
        res.json({message: "here is the error"})
    }

});
app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    const user = UserModel.findOne({ email: email, password: password });
    if (user) {
        const token = jwt.sign({id: user._id},'abc');
        res.json({ message: "You are logged in" , token: token });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});
app.post('/todo', (req, res) => {});
app.get('/todos', (req, res) => {});


app.listen(3002);
