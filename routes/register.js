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
router.post('/',async function(req,res){
  try{
    const salt = await bcrypt.genSalt();
    var hashedPassword = await bcrypt.hash(req.body.password,salt);
    console.log(hashedPassword);
  }catch(error){
    res.status(203).send();
  }
  

   var tempuser = new usermodel({
    emailId: req.body.email,
    password: hashedPassword,
    userName: req.body.uname,
    admin: req.body.admincheck
   });

   try{
    usermodel.create(tempuser);
    console.log("tempuser created succesfully");
    res.redirect('/login');
   }
   catch(error){
        console.log("some error occured");
   }
});


module.exports = router;