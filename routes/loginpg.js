var express = require('express');
let router = express.Router();
var bcrypt = require('bcryptjs');
var ejs = require('ejs');
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
var usermodel = require('../models/user');
const { verify } = require('../middleware');
// use bodyparser 


router.use(express.json());
router.use(express.urlencoded({
    extended: true
  }));


// mongodb connection
mongoose.connect('mongodb://localhost:27017/register',{useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex:true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful!");
});



// main page for login
router.get('/',function(req,res){
    res.render('loginpg/login');
});

router.post('/',async function(req, res){
    //get username and password from form
    let username = req.body.username;
    let password = req.body.password;
    
    
    if (!username || !password){
        return res.status(401).send();
    };
    
    
    
    // search for the user based on username in database
    const tempuser = await usermodel.findOne({userName: username}); 
    let payload;
    
    
    if(!tempuser || tempuser === null){
        console.log("nt a user");
        res.redirect('/register');


    }else{
        
        try{
            payload = {username: username, admin: tempuser.admin};
            if(await bcrypt.compare(req.body.password,tempuser.password)){
                console.log("logged in");
                

                
                

                // create accesstoken
                let accessToken = jwt.sign(payload, "bcozimbatman", {
                    algorithm: "HS256",
                    expiresIn: 240
                });
                
                

                //create the refresh token
                let refreshToken = jwt.sign(payload, "bcozimnotbatman", {
                    algorithm: "HS256",
                    expiresIn: 86400
                });
                
                tempuser.token = refreshToken;
                
                res.cookie("mcook", accessToken, {secure: true, httpOnly: true});
                res.redirect('/');
            }else{
                console.log("failed");
                res.status(203).send();
            }
        }catch(error){
            console.log(error);// if error -- then redirect to same login page 
            res.redirect('/login');
        }
            

    }
    
    

    
}
);



module.exports = router;
