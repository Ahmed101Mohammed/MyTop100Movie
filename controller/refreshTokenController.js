const User = require('../model/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handelRefreshToken = async(req,res)=>{
    const cookies = req.cookies;
    // if the cookies is not exist  orjwt:
    if(!cookies || !cookies.jwt)
    {
        return res.sendStatus(401);
    }

    // the refresh token:
    const refreshToken = cookies.jwt;
    console.log('refreshT',refreshToken);

    // Searshing about the user who have the refreshToken.
    let myUser;
    await User.findOne({refreshTokenSecret:refreshToken}).then((user)=>{

        if(user === null)
        {
            
            return res.sendStatus(403);
        }
        myUser = user;
        
    });
    console.log({myUser,refreshToken,REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET});

    // if the inputs is fine:
    try{
        let accessToken;
        console.log('r',refreshToken)
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (error,decoded)=>{
                console.log('hi im decoded part')
                if(error || myUser.userName !== decoded.userName)
                {
                    res.sendStatus(403);
                }
                console.log('asign token')
                accessToken = jwt.sign(
                    {userName:decoded.userName},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn:'60s'}
                )
               
            }
        );
        res.json({accessToken})
    }
    catch(e)
    {
        res.status(500).json({error:e});
    }

}

module.exports = handelRefreshToken;