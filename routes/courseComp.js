var express = require('express');
let router = express.Router();
var course = require('../models/course');

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
    var allcourses = await course.find({});// allcourses will be passed via get to website 
    res.render('courseComp/courseCom',{allcourses:allcourses});// function to display all courses 
});




module.exports = router;
