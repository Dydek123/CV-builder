const jwt = require('jsonwebtoken');
import { UserI } from '../interfaces/userI';
require('dotenv').config();

const signJWT = async (user: UserI, callback:(err: Error | null, token: string|null) => void):Promise<string> => {
    const timeSinceEpoch = new Date().getTime();
    const expirationTime = timeSinceEpoch + Number(process.env.SERVER_TOKEN_EXPIRETIME) * 100000;
    const expirationTimeInSeconds = Math.floor(expirationTime / 1000);
    try{
        // jwt.sign({email:user.email}, process.env.SERVER_TOKEN_SECRET, {algorithm: 'HS256'})
        return await jwt.sign({
            email: user.email
        },
            process.env.SERVER_TOKEN_SECRET,
{
            issuer: process.env.SERVER_TOKEN_ISSUER,
            algorithm: "HS256",
            expiresIn: expirationTimeInSeconds
        })
    } catch (error) {
        console.log(error.message);
        callback(error, null);
    }
}

export default signJWT;
