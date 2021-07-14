var express = require('express');
let router = express.Router();

var ejs = require('ejs');

const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Uname = "Login";

var usermodel = require('../models/user');

// use bodyparser 


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



router.get('/',function(req,res){
    res.render('loginpg/login');
});

router.post('/',async function(req,res){
    
    const email = req.body.email;
    const password = req.body.password;

    console.log(email);
    console.log(password);

    const tempuser = await usermodel.findOne({emailId:email}); 

    
    
    if(!tempuser){
        console.log("nt a user");
        res.redirect('/');


    }else{
        
        console.log(tempuser);
        if(tempuser.password === password){
            console.log("logged  in successfully");
            Uname = tempuser.userName;
            
            res.redirect('/');
            
        }else{
            console.log("sorry try again");
            res.send("invalid password");
        }

    }
})

module.exports = router;
