const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    if(!authHeader){return res.sendStatus(401)};
    console.log(authHeader);

    const token = authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (error,decoded)=>{
            console.log(decoded);
            if(error){return res.sendStatus(301)};
            req.userName = decoded.userName;
            next();
        }
    )
}

module.exports = verifyJWT;