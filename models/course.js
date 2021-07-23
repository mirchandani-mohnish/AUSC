const mongoose = require('mongoose');


const Schema = mongoose.Schema;


var course = new Schema({
    title: {type: String , required:true},
    faculty:{type: String, required:true},
    code:{type:String,required:true},
    rating:{type:Number},
    category:{type:Array},
    tags:{type:Array},
    content:{type: String},
    credits:{type: Number}


});


module.exports = mongoose.model("course",course,"courses");

