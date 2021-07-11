
const mongoose = require('mongoose');


const Schema = mongoose.Schema;


var user = new Schema({
    emailId: { type:String},
    password: { type:String},
    userName: { type:String}


})
