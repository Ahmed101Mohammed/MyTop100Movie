const User = require('../model/user');
const bcrypt = require('bcrypt');

const handelRegister = async(req,res)=>{
    let userName = req.body.userName;
    let pwd = req.body.pwd;
    // if the user forget to input any required data:
    if(!userName || !pwd)
    {
        return res.status(404).json({error:"You should input the userName and the password"})
    }

    // if the user input userName that allready Existed
    User.findOne({userName:userName}).then(user=>{
        console.log('u',user);
        if(user !== null && user.userName === userName)
        {
            return res.status(301).json({error: 'Sorry the userName was used before'})
        }
    });
    

    // if the inputs is fine:
    try{
        let pwdHash = await bcrypt.hash(pwd,10);
        //console.log('pwdHash',pwdHash);
        
        const user = new User({
            userName: req.body.userName,
            pwd: pwdHash,
        })
        console.log(user);
        const newUser = await user.save();
        console.log(newUser);
        res.json(newUser);
        
    }
    catch(e)
    {
        res.status(500).json({error:e});
    }

}

module.exports = handelRegister;