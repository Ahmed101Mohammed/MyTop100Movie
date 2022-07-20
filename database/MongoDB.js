// packeges:
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DB_ACCESS,()=>{
    console.log('The DataBase is here ....')
})

module.exports = mongoose;