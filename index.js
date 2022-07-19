// the main packeges
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// routing 


// express App:
const app = express();

// app midleware(s):
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({extended:false}))



// listen to server:
app.listen(3000,()=>{
    console.log('The server is runing at port 3000')
})