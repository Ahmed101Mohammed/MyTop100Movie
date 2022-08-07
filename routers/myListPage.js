const express = require('express');
let path = require('path');
const router = express.Router();
router.route('/')
    .get((req,res)=>{
        console.log('Im in my list page')
        res.sendFile(path.join(__dirname,'..','view','mylist.html'));
        
    });

module.exports = router;