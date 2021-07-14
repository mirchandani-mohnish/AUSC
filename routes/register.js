var express = require('express');
let router = express.Router();
var ejs = require('ejs');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var usermodel = require('../models/user');




router.use(express.json());
router.use(express.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/register',{useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex:true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful!");
});

// user schema made in models folder 


router.get('/', function(req,res){
    res.render('loginpg/signup');
});



// post function for register page 
router.post('/',function(req,res){
    
  

   var tempuser = new usermodel({
    emailId: req.body.email,
    password: req.body.password,
    userName: req.body.uname
   });
   try{
    usermodel.create(tempuser);
    console.log("tempuser created succesfully");
    res.redirect('/');
   }
   catch(error){
        console.log(error);
   }
});


module.exports = router;