const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/db');
const authentication = require('./routes/authentication')(router);
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

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/authentication', authentication);




app.listen(3000 || process.env.PORT,()=>{
    console.log('App listening on port 3000');
})