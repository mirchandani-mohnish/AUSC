var express = require('express');
var router = express.Router();
var course = require('../models/course');

// mongodb connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/register',{useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex:true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful! - admin");
});


router.get('/',async function(req,res){
    var allcourses = await course.find({});

    res.render('compAdmin/adminpg',{allcourses:allcourses});

});



router.post('/add',async function(req,res){
    tempcourse = new course({
        title: req.body.name,
        faculty: req.body.faculty,
        code: req.body.code,
        category: req.body.category,
        tags: req.body.tags,
        content: req.body.content
    });

    try{
    course.create(tempcourse);
    console.log("course created");
    res.redirect('/admin');
    }
    catch(error){
        console.log("some error occured");
    }



    
});



module.exports = router;