const User = require('../model/user');

const addToMyListController = async(req,res)=>{
    console.log('You are in add to list controller')
    const cookies = req.cookies;
    const movie = req.body;
    
    if(!cookies && !cookies.jwt)
    {
        return res.sendStatus(401);
    }

    let refeshToken = cookies.jwt;
    await User.findOne({refreshTokenSecret:refeshToken}).then((user)=>{
        
        if(!user){
            res.sendStatus(404);
        }
        
        user.myList.push(movie);
        user.save();
    })

    try{
        const authHeader = req.headers['authorization'];
        console.log('/love',{authHeader});
        res.sendStatus(200);

    }
    catch(e)
    {
        res.sendStatus(500);
    }

}

const removeFromMyListController = async(req,res)=>{
    console.log('You are in remove from list controller')
    const cookies = req.cookies;
    const movie = req.body;
    
    if(!cookies && !cookies.jwt)
    {
        return res.sendStatus(401);
    }

    let refeshToken = cookies.jwt;
    await User.findOne({refreshTokenSecret:refeshToken}).then((user)=>{
        
        if(!user){
            res.sendStatus(404);
        }
        console.log(movie);
        
        user.myList = user.myList.filter((m)=>{

            if(m.title !== movie.title)
            {
                console.log(m.title,movie.title);
                return m;
            }

        });
        user.save();
    })

    try{
        const authHeader = req.headers['authorization'];
        console.log('/love',{authHeader});
        res.sendStatus(200);

    }
    catch(e)
    {
        res.sendStatus(500);
    }

}
module.exports = {addToMyListController,removeFromMyListController};