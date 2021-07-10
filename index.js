var express = require('express');
var app = express();
const mongoose = require('mongoose');
const path = require('path');
var bodyParser = require('body-parser');
var user = require('./models/user');

// use bodyparser 
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));




app.set('view engine','ejs');
// import statements for bootstrapp --------
app.use(
    "/css",
    express.static(path.join(__dirname,"node_modules/bootstrap/dist/css"))
);

app.use(
    "/js",
    express.static(path.join(__dirname,"node_modules/bootstrap/dist/js"))
);
// /------


// site main home page -----
app.get('/',function(req,res){
    res.render('home/homemain');
});
// /------


// site login page
app.get('/login',function(req,res){
    res.render('loginpg/login');
});


// site register page 
app.get('/register', function(req,res){
    res.render('loginpg/signup');
});


mongoose.connect('mongodb://localhost:27017/',{useNewUrlParser: true , useUnifiedTopology: true });
const db = mongoose.connection;

app.post('/register',function(req,res){
    try{
        let tempuser = new user({
            userName: req.body.uname,
            email: req.body.email,
            password: req.body.password
        });
        

        tempuser.save(function(err,res){
            if(err){
                console.log("error");
            }else{
                console.log("document saved");
            }
        });
        

    }
    catch(error){

        res.send("invalid ");
    }
})


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
