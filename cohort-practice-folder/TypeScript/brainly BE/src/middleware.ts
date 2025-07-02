import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
export const middleware = (req: Request, res: Response, next: NextFunction)=>{

    const header = req.headers["authorization"];
    const pw = "secret"
    const decoded = jwt.verify(header as string, pw);
    console.log("hearder", header)
    if(decoded){
        //@ts-ignore
        req.userId = decoded.userId;
        next();
    }
    else{
        res.status(403).json({
            message: "user not logged in"
        })
    }
}