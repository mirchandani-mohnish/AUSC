var express = require('express');
let router = express.Router();
var course = require('../models/course');
var user = require('../models/user');
var jwt = require('jsonwebtoken');

// mongodb connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/register',{useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex:true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful!");
});


// allcourses will be passed via get to website 


router.get('/',async function(req,res){
  let accessToken = req.cookies.mcook
  if (!accessToken){
      return res.status(403).send()
  }
  let payload
  try{
      
      payload = jwt.verify(accessToken, "bcozimbatman");
      
      var allcourses = await course.find({});// allcourses will be passed via get to website 
      var curruser = user.findOne({userName: payload.username});
      var usercourses = curruser.courses;
      var usercoursearray;
      if(typeof(usercoursearray) !== "undefined"){
      
        for(var l1 = 0;l1 < usercourses.length();l1++){
          usercoursearray.append(course.findOne({code: usercourses[l1]}));
        }
      }
      
    
      res.render('courseComp/courseCom',{allcourses:allcourses,mycourses: usercoursearray});// function to display all courses 
      
     
  }
  catch(e){
      //if an error occured return request unauthorized error
      
    console.log(e);
    res.send("please sign in again");

  
      
  }
  
    
});
router.post('/',async function(req,res){
  var allcourses = await course.find({title: req.body.searchval});// allcourses will be passed via get to website 
  
  res.render('courseComp/courseCom',{allcourses:allcourses});// function to display all courses 
});


router.post('/selectcourse',async function(req,res){
  
})



module.exports = router;
