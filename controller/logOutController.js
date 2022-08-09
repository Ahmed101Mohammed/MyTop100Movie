const User = require('../model/user');

const handelLogOut = async(req,res)=>{
    const cookies = req.cookies;
    // if the cookies is not exist  orjwt:
    if(!cookies || !cookies.jwt)
    {
        return res.sendStatus(201).json({noContent:'you are out already'});
    }

    // the refresh token:
    const refreshToken = cookies.jwt;
    console.log('refreshT',refreshToken);

    // Searshing about the user who have the refreshToken.
    await User.findOne({refreshTokenSecret:refreshToken}).then((user)=>{

        if(user === null)
        {
            res.clearCookie('jwt',{httpOnly:true})
            return res.sendStatus(204);
        }
        user.refreshTokenSecret = "";
        console.log({user})
        user.save()
        .catch((e)=>{
            return res.sendStatus(301);
        });
        
    });
    // if the inputs is fine:
    try{
        res.clearCookie('jwt',{httpOnly:true})
        res.sendStatus(200);
       
    }
    catch(e)
    {

        res.status(500).json({error:e});
    }

}

module.exports = handelLogOut;