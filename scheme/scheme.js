const mongoose = require('mongoose');

const users = new mongoose.Scheme({
    name:{
        type:String,
        default:'No-typed',
        require: true,
    },

    password:{
        type:String,
        default:'',
        require: true,
    },

    email:{
        type:String,
        default:'',
    },

    id:{
        type:Number,
        default:0,
    },

    phoneNum:{
        type:Number,
        default:0,
    },
})

module.exports = mongoose.model('users',users);