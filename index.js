
//imports
var express = require('express');
var app = express();
const path = require('path');
var jwt = require('jsonwebtoken');
var cookieparsar = require('cookie-parser');
const {verify,verifyadmin} = require('./middleware');
var user = require('./models/user')

// routes
var register = require('./routes/register');
var login = require('./routes/loginpg');
var courseComp = require('./routes/courseComp');
var todo = require('./routes/todo');
var admin = require('./routes/adminpg');

//variables
var Uname = "Login"; 




app.set('view engine','ejs');
app.set('views','./templates/views');


// import statements for bootstrapp ============================================
app.use(
    '/css',
    express.static(path.join(__dirname,"node_modules/bootstrap/dist/css"))
);

app.use(
    '/js',
    express.static(path.join(__dirname,"node_modules/bootstrap/dist/js"))
);
// bootstrap ends ===============================================================


// static uses 
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/res'));
app.use(cookieparsar());
// site main home page -----
var todomodel = require('./models/Todo');

// main home page -- only works if logged in
app.get('/',async function(req,res){
    
    
    let accessToken = req.cookies.mcook

    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken){
        var mytodos;
        res.render('home/homemain',{Uname:"Login", todos: mytodos,isadmin:false});
    }



    let payload
    try{
        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
        payload = jwt.verify(accessToken, "bcozimbatman");
        var mytodos = await todomodel.find({username: payload.username});
        var thisuser = await user.findOne({userName: payload.username});
        
        res.render('home/homemain',{Uname:payload.username, todos: mytodos, isadmin:payload.admin, usercourses:thisuser.courses}); 
        
        
    }
    catch(e){
        res.redirect('/login');  
    }
});


// routes -- used
app.use('/login',login); // login page
app.use('/register',register);// register
app.use('/courseComp',verify,courseComp);// course companion
app.use('/todo',verify,todo);// todo list 
app.use('/admin',verifyadmin,admin);// admin companion


app.get('/about', function(req,res){
    res.render('about');
});




app.listen(process.env.PORT || 3000);




//get - get from server
// post - send to server
// put - update in server
// delete - delete the data in server
