let user = require('../model/user');


const getUserMovies = async (req,res)=>{
    let cookies = req.cookies;
    console.log('I am in getUserMovies controller')
    if(!cookies && !cookies.jwt)
    {
        return res.sendStatus(401);
    }
    console.log('here is getUserMovies',cookies.jwt);
    let refreshTokenSecret = cookies.jwt;
    let userMovies;
    await user.findOne({refreshTokenSecret:refreshTokenSecret}).then((user)=>{
        if(!user)
        {
            return res.sendStatus(301);
        }
        userMovies = user.myList;
    })

    try{
        console.log('yeah')
        if(userMovies.length === 0)
        {
            console.log('yeah No')
            res.status(200).json({'data':`User does not has any lovely movie.`});
        }        
        else
        {
            console.log('yeah yes',userMovies)
            res.json({userMovies});
            
        }
    }
    catch(e)
    {
        res.sendStatus(500);
    }
}

module.exports = {getUserMovies};