var express = require('express');
var app = express();
const path = require('path');


// routes
var register = require('./routes/register');
var login = require('./routes/loginpg');
//var courseComp = require('./routes/courseComp');
var todo = require('./routes/todo');

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

// site main home page -----
app.get('/',function(req,res){
    res.render('home/homemain',{Uname:Uname});
});

// routes -- used
app.use('/login',login); // login page
app.use('/register',register);// register
//app.use('/courseCom',courseComp);
app.use('/todo',todo);







app.listen(3000);




//get - get from server
// post - send to server
// put - update in server
// delete - delete the data in server
