import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken')
require('dotenv').config();

const extractJWT = (req:Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization?.split(' ')[1];
    if (token){
        return jwt.verify(token, process.env.SERVER_TOKEN_SECRET);
        // jwt.verify(token, process.env.SERVER_TOKEN_SECRET, ((err, decoded) => {
        //     if (err) return res.status(401).json({
        //             message: err.message,
        //             err
        //     })
        //     res.locals.jwt = decoded;
        //     next();
        // }))
    }
    else {
        return res.status(401).json({
            message:'Unauthorized'
        })
    }
}
export default extractJWT;
