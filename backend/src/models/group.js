const mongoose = require('mongoose')
const User= require('./models/user.js');
const Task = require('./models/Task.js');

const groupSchema = new mongoose.Schema({
    groupname:{
        type:String,
        require:true,
        unique:true
    },
    code:{
        type:String,
        require:true,
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

module.exports = mongoose.model["GroupSchema",groupSchema]