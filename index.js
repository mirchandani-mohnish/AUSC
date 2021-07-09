var express = require('express');
var app = express();
const mongoose = require('mongoose');
const path = require('path');


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

app.post('/login',function(req,res){
    
        const email = req.body.email;
        const pass = req.body.password;

        console.log("email and password submitted ");
    
})
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
