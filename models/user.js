const mongoose = require('mongoose');


const Schema = mongoose.Schema;


var user = new Schema({
    emailId: { type:String , required:true},
    password: { type:String, required:true},
    userName: { type:String,required:true,unique:true}


});


module.exports = mongoose.model("usermodel",user,"users");

