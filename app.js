const express = require('express');
const mongoose = require('mongoose');
const users = require("./schema/users");
const router = require('./routes/index')
const path = require('path'); 
const app = express();
const PORT = 3000;


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/router');


app.listen(PORT, ()=>{
console.log("app is listening in port " +PORT)
})
