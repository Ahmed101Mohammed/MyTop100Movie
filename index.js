// the main packeges
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// express App:
const app = express();

// db:
const mongoDB = require('./database/MongoDB');
// routing 
app.use('/',require('./routers/homeRouter'))



// app midleware(s):
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({extended:false}));
app.use('/',express.static('public'));
app.use('/register',require('./routers/registerRout'));
app.use('/auth',require('./routers/authRouter'));

// listen to server:
app.listen(3000,()=>{
    console.log('The server is runing at port 3000')
})