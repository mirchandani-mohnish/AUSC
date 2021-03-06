var express = require('express');
var router = express.Router();
var course = require('../models/course');
var jwt = require('jsonwebtoken');
var user = require('../models/user');


// mongodb connection
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://auscUser:To9pIskwZ1U6smCp@ausc-app-cluster.favd0.mongodb.net/dbAusc?retryWrites=true&w=majority',{useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex:true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful! - admin");
});

// admin main page
router.get('/',async function(req,res){
    var allcourses = await course.find({});

    res.render('compAdmin/adminpg',{allcourses:allcourses});

});


// admin add course function - adds course to the list of courses available  

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


// user panel -- admin can add or delete courses for users 
router.get('/userpanel', async function(req,res){
    let accessToken = req.cookies.mcook
    if (!accessToken){
        return res.status(403).send()
    }
    let payload
    try{
        
        payload = jwt.verify(accessToken, "bcozimbatman");
        
        var userlist;//list of registered users
        await user.find({}).then(users => userlist = users).catch(error => console.log(error));
        res.render('compAdmin/userpanel',{userlist: userlist});
        
    }
    catch(e){
        //if an error occured return request unauthorized error
        
        console.log(e);
        res.send("please sign in again");

    
        
    }
  
    
    
    
});

// add course for specific user from list of availble courses 
router.post('/userpanel/addcourse:edituser', async function(req,res){
    var edituser = req.params.edituser;
    var curruser = await user.findOne({userName: edituser});
    if(typeof(curruser.courses) === 'undefined'){
        var temparr = [req.body.code];
        curruser.courses = temparr;
    }else{
        curruser.courses.push(req.body.code);
    }
    console.log(curruser);
    curruser.save().then(res.redirect('/admin/userpanel')).catch(e => console.log(e));


});



router.get('/userpanel/delcourse/:edituser/:delcourse', async function(req,res){
    var edituser = req.params.edituser;
    var curruser = await user.findOne({userName: edituser});
    var delcourse = req.params.delcourse;


    if(typeof(curruser.courses) === 'undefined'){
        console.log("nothing to delete");
    }else{
        curruser.courses.pull(delcourse);
    }
    console.log(curruser);
    curruser.save().then(res.redirect('/admin/userpanel')).catch(e => console.log(e));


});

// a userpanel function which categorizes students and also displays all the courses that they
//have chosen -- it should allow an admin to allot courses to students when required


module.exports = router;