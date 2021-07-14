const mongoose = require('mongoose');


const Schema = mongoose.Schema;


var course = new Schema({
    name: {type: String , required:true},
    faculty:{type: String, required:true},
    code:{type:String,required:true},
    


})
