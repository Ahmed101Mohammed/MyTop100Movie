const express = require('express');
let path = require('path');
const router = express.Router();
router.route('/')
    .get((req,res)=>{
        const cookies = req.cookies;
        console.log('Im in my list page',{cookies})
        res.sendFile(path.join(__dirname,'..','view','mylist.html'));
        
    });



module.exports = router;