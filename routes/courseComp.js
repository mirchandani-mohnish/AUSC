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
      var curruser;
      await user.findOne({userName: payload.username}).then(thisuser => curruser = thisuser).catch(error => console.log(error));
      

      
      
      var coursearray = curruser.courses;
      var usercoursearray = await course.find({'code' : {$in : coursearray}});
    
      res.render('courseComp/courseCom',{allcourses:allcourses,mycourses:usercoursearray });// function to display all courses 
      
     
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


router.get('/selectcourse:_code',async function(req,res){
  let accessToken = req.cookies.mcook;
  let {_code} = req.params;

  if (!accessToken){
      return res.status(403).send()
  }
  let payload
  try{
      
      payload = jwt.verify(accessToken, "bcozimbatman");
      //var coursesel = await course.find({code:_code}).catch(error => console.log(error));;// allcourses will be passed via get to website 
      var curruser;
      await user.findOne({userName: payload.username}).then(thisuser => curruser = thisuser).catch(error => console.log(error));
      //console.log(curruser);
      // var currcourse;
      // course.findOne({code: _code}).then(thiscourse => currcourse = thiscourse).catch(e => console.log(e));
      if(typeof(curruser.courses) === 'undefined'){
        var temparray = [_code];
        curruser.courses = temparray;
        curruser.save().catch(error => console.log(error));
      }else{
        curruser.courses.push(_code);
        curruser.save().catch(error => console.log(error));
      }
      
      
      

      
      
      res.redirect('/courseComp');
      //res.render('courseComp/courseCom',{allcourses:allcourses,mycourses: curruser.courses});// function to display all courses 
      
     
  }
  catch(e){
      //if an error occured return request unauthorized error
      
    console.log(e);
    res.send("please sign in again");

  
      
  }
  
});



module.exports = router;
