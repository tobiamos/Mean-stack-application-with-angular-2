const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/db');
mongoose.Promise = global.Promise;
mongoose.connect(config.uri);

mongoose.connection.on('connected',()=>{
    console.log('Connected to :', config.uri);
   
});

mongoose.connection.on('error',(err)=>{
    console.log(`Error connectiong to ${config.uri}`, err);
});

mongoose.connection.on('disconnected', ()=>{
    console.log('Disconnected from ', config.uri);
});



app.get('*', (req,res,next)=>{
    res.send('<h1>Hello World</h1>');
});


app.listen(3000 || process.env.PORT,()=>{
    console.log('App listening on port 3000');
})