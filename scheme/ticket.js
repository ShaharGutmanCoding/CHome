const mongoose = require('mongoose');

const ticket = new mongoose.Schema({
    name:{
        type:String,
        default:'anonymous',
        require: true,
    },
    category:{
        type:String,
        default:'',
        require: true,
    },
    date:{
        type:String,
        require: true,
    },
    createdBy:{
        type:String,
        require: true,
    },
    description:{
        type:String,
        default:'',
        require: true,
    },
})

module.exports = mongoose.model('ticket',ticket);