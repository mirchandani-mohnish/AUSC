var express = require('express');
var app = express();
const path = require('path');


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

// site main home page -----
var todomodel = require('./models/Todo');
app.get('/',async function(req,res){
    var mytodos = await todomodel.find({});

    res.render('home/homemain',{Uname:Uname, todos: mytodos}); // send todos for the mini todo panel in 
});

// routes -- used
app.use('/login',login); // login page
app.use('/register',register);// register
app.use('/courseComp',courseComp);// course companion
app.use('/todo',todo);// todo list 
app.use('/admin',admin);// admin companion







app.listen(3000);




//get - get from server
// post - send to server
// put - update in server
// delete - delete the data in server
