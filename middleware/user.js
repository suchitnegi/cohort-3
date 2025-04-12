const jwt = require('jsonwebtoken')
const {JWT_USER_SECRET} = require('./../config')

function userMiddleware(req,res,next){
    const token = req.headers.token;
    const decode = jwt.verify(token,JWT_USER_SECRET);

    if(decode){
        req.userId = decode.userId;
        next();
    }
    else{
        res.status(403).json({
            message: "you are not signed in"
        })
    }
}

module.exports = {
    userMiddleware: userMiddleware
}