const User = require('../model/user');


const addToMyListController = async(req,res)=>{
    const cookies = req.cookies;
    const movie = req.body.movie;
    if(!cookies && !cookies.jwt)
    {
        return res.sendStatus(401);
    }

    let refeshToken = cookies.jwt;
    await User.findOne({refreshTokenSecret:refeshToken}).then((user)=>{
        if(!user){
            res.setStatus(404);
        }
        user.myList.push(movie);
        user.save();
    })

    try{
        res.sendStatus(200).res.json({movie});

    }
    catch(e)
    {
        res.sendStatus(500).json({e:`Internal error: ${e}`});
    }

}