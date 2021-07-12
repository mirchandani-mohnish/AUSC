var express = require('express');
var app = express();
const mongoose = require('mongoose');
const path = require('path');
var bodyParser = require('body-parser');
var user = require('./models/user');
var ejs = require('ejs');
var connect = require('connect');

var bcrypt = require('bcryptjs');
//const { use } = require('passport');

// use bodyparser 
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));




app.set('view engine','ejs');
// mongoose connection
mongoose.connect('mongodb://localhost:27017/register',{useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex:true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful!");
});

// user schema made in models folder 
var usermodel = mongoose.model("model",user,"users");

// import statements for bootstrapp ============================================
app.use(
    "/css",
    express.static(path.join(__dirname,"node_modules/bootstrap/dist/css"))
);

app.use(
    "/js",
    express.static(path.join(__dirname,"node_modules/bootstrap/dist/js"))
);
// bootstrap ends ===============================================================


// site main home page -----
app.get('/',function(req,res){
    res.render('home/homemain');
});
// /------


// site login page -------------------------------------------------------------

app.get('/login',function(req,res){
    res.render('loginpg/login');
});

app.post('/login',function(req,res){
    const {username , password} = req.body;

    const tempuser = usermodel.findOne({username}).lean();

    if(!tempuser){
        return res.json({status:'error'});
    }else{
        
        if(bcrypt.compare(password,user.password)){
            
            res.redirect('/');

        }else{
            return res.json({status: 'error'});
        }
    }
})

// site login page ends ========================================================


// site register page ----------------------------------------------------------
app.get('/register', function(req,res){
    res.render('loginpg/signup');
});



// post function for register page 
app.post('/register',function(req,res){
    
   var tempuser = new usermodel({
    emailId: req.body.email,
    password: (bcrypt.hash(req.body.password,5)),
    userName: req.body.uname
   });
   try{
    usermodel.create(tempuser);
    console.log("created succesfully",res);
   }
   catch(error){
        console.log(error);
   }

   /*
   tempuser.save(function(err,res){
        if(err){
            console.log("document invalid");
        }else{
            console.log("valid");
        }
   });*/

   
    

    res.redirect('/login');
    
})
// register ends ==================================================

// mongoose database connection
/*
mongoose.connect('mongodb://localhost:27017/',{useNewUrlParser: true});
const db = mongoose.connection;
const query = user.find();
app.post('/login',function(req,res){
    try{

    
        const email = req.body.email;
        const pass = req.body.password;
        

        
    }
    catch(error){

    
        
        res.send("invalid ");
    }
    
})
*/

// /------




/*
mongoose.connect('mongodb://localhost:27017/',{useNewUrlParser: true});
const db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){

})

*/





app.listen(3000);




//get - get from server
// post - send to server
// put - update in server
// delete - delete the data in server
