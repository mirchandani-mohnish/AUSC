var express = require('express');
var app = express();
const path = require('path');
var jwt = require('jsonwebtoken');
var cookieparsar = require('cookie-parser');
const {verify} = require('./middleware');


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
    "/css",
    express.static(path.join(__dirname,"node_modules/bootstrap/dist/css"))
);

app.use(
    "/js",
    express.static(path.join(__dirname,"node_modules/bootstrap/dist/js"))
);
// bootstrap ends ===============================================================

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cookieparsar());
// site main home page -----
var todomodel = require('./models/Todo');
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
        
        res.render('home/homemain',{Uname:payload.username, todos: mytodos, isadmin:payload.admin}); 
        
        
    }
    catch(e){
        //if an error occured return request unauthorized error
        
    

        var mytodos;
        res.render('home/homemain',{Uname:"Login", todos: mytodos,isadmin:false}); // send todos for the mini todo panel in 
    }
});

// routes -- used
app.use('/login',login); // login page
app.use('/register',register);// register
app.use('/courseComp',verify,courseComp);// course companion
app.use('/todo',verify,todo);// todo list 
app.use('/admin',verify,admin);// admin companion







app.listen(3000);




//get - get from server
// post - send to server
// put - update in server
// delete - delete the data in server
