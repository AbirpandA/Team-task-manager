const mongoose = require('mongoose')
const User= require('./models/user.js');
const Task = require('./models/Task.js');

const groupSchema = new mongoose.Schema({
    groupname:{
        type:String,
        required:true,
        unique:true
    },
    code:{
        type:String,
        required:true,
        unique:true
    },
    task:[{
        type:mongoose.Schema.ObjectId,
        ref:'Task'
    }],
    members:[{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }],
    createBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }
})

module.exports = mongoose.model("Group",groupSchema)