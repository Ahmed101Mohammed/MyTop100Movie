const express = require('express');
const router = express.Router();
const path = require('path');
const fsPro = require('fs').promises;

router.route('/')
    .get(async (req,res)=>{
            
            
        res.status(200).contentType('text/html').sendFile(path.join(__dirname,'..','view','index.html'));
            
       
    });

module.exports = router;