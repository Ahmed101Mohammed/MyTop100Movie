// the main packeges
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const vetifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
// express App:
const app = express();

// db:
const mongoDB = require('./database/MongoDB');

// app midleware(s):
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({extended:false}));
app.use('/',express.static('public'));
app.use(cookieParser());
app.disable('x-powered-by');
// routing 
app.use('/register',require('./routers/registerRout'));
app.use('/auth',require('./routers/authRouter'));
app.use('/refresh',require('./routers/refreshTokenRouter'));
app.use('/logOut',require('./routers/logOutRouter'));
app.use('/home',require('./routers/homeRouter'))
// routes with verify JWT:
app.use(vetifyJWT);
app.use('/love',require('./routers/heartRouter'));
app.use('/mylist',require('./routers/getUserMovies'));
// listen to server:
app.listen(3000,()=>{
    console.log('The server is runing at port 3000')
})