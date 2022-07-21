const User = require('../model/user');
const bcrypt = require('bcrypt');

const handelAuth = async(req,res)=>{
    let userName = req.body.userName;
    let pwd = req.body.pwd;
    // if the user forget to input any required data:
    if(!userName || !pwd)
    {
        return res.status(404).json({error:"You should input the userName and the password"})
    }

    // if the user input userName that allready Existed
   
    let userPwd;
    await User.findOne({userName:userName}).then((user)=>{
        

        if(user === null)
        {
            
            return res.status(401).json({error:'The user name is wrong, if yow do not have an account, register pls..'})
        }
        else
        {
            userPwd = user.pwd;
        }
    });
    

    // if the inputs is fine:
    try{
        
        const match = await bcrypt.compare(pwd,userPwd);
        
        if(!match)
        {
            return res.status(301).json({error:'The password is error for the User name'})
        }
        
        res.json({congratulation: 'You arr sign now'})
        
    }
    catch(e)
    {
        res.status(500).json({error:e});
    }

}

module.exports = handelAuth;