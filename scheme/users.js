const mongoose = require('mongoose');

const users = new mongoose.Schema({
    firstName:{
        type:String,
        default:'No-typed',
        require: true,
    },

    lastName:{
        type:String,
        default:'No-typed',
        require: true,
    },

    password:{
        type:String,
        default:'',
        require: true,
    },

    region:{
        type:String,
        default:'No-typed',
        require: true,
    },

    city:{
        type:String,
        default:'No-typed',
        require: true,
    },

    email:{
        type:String,
        unique: true,
    },

    id:{
        type:Number,
        default:0,
    },

    phoneNum:{
        type:String,
        default:0,
    },
   
})

module.exports = mongoose.model('usersChome',users);