const mongoose = require('mongoose');

const ticket = new mongoose.Schema({
    category:{
        type:String,
        default:'',
        require: true,
    },
    date:{
        type:Date,
        require: true,
    },
    description:{
        type:String,
        default:'',
        require: true,
    },
})

module.exports = mongoose.model('ticket',ticket);