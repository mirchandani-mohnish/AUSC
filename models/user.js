const mongoose = require('mongoose');
const course = require('./course');

const Schema = mongoose.Schema;


var user = new Schema({
    emailId: { type:String , required:true},
    password: { type:String, required:true},
    userName: { type:String,required:true,unique:true},
    token:{type: String},
    admin:{type: Boolean},
    courses:[String]

});


module.exports = mongoose.model("usermodel",user,"users");

