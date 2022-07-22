const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        userName:{
            type: String,
            required: true
        },
        pwd:{
            type: String,
            required: true
        },
        myList:{
            type:Array,
            default: []
        },
        refreshTokenSecret:{
            type: String,
            default: ''
        }

    }
)

module.exports = mongoose.model( 'User', UserSchema);
