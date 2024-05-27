const mongoose = require('mongoose');

const cookies = new mongoose.Schema({
    email:{
        type:String,
        default:'',
        unique: true,
    },

    token:{
        type:String,
        default:'',
        unique: true,
    },
})

module.exports = mongoose.model('cookies',cookies);