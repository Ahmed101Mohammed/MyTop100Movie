const express = require('express');
let path = require('path');
const router = express.Router();
router.route('/')
    .get((req,res)=>{
        const authHeader = req.headers['authorization'];
        console.log('Im in my list page',{authHeader})
        res.sendFile(path.join(__dirname,'..','view','mylist.html'));
        
    });

module.exports = router;