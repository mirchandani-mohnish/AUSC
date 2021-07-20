var express = require('express');
let router = express.Router();
var bcrypt = require('bcryptjs');

var ejs = require('ejs');
var jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');



var usermodel = require('../models/user');
const { verify } = require('../middleware');
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

router.post('/',async function(req, res){

    let username = req.body.username;
    let password = req.body.password;
    
    // Neither do this!
    if (!username || !password){
        return res.status(401).send();
    };
    
    //use the payload to store information about the user such as username, user role, etc.
    

    const tempuser = await usermodel.findOne({userName: username}); 
    let payload = {username: username, admin: tempuser.admin};
    
    
    if(!tempuser){
        console.log("nt a user");
        res.redirect('/');


    }else{
        
        try{
            if(await bcrypt.compare(req.body.password,tempuser.password)){
                console.log("logged in");
                

                //create the access token with the shorter lifespan
                

                
                let accessToken = jwt.sign(payload, "bcozimbatman", {
                    algorithm: "HS256",
                    expiresIn: 240
                });
                
                

                //create the refresh token with the longer lifespan
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
            console.log(error);
        }
            

    }
    
    

    
}
);



module.exports = router;
