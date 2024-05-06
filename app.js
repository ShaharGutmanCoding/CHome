const express = require('express');
const path = require('path'); 
const app = express();
const PORT = 3000;


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());



app.listen(PORT, ()=>{
console.log("app is listening in port " +PORT)
})
