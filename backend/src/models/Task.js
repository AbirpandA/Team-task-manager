const mongoose = require('mongoose');
const User= require('./models/user.js');

const taskSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    dueDate:{
        type:Date,
        required:true
    },

    createdby:{ 

        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    group:{
        type: mongoose.Schema.ObjectId,
        ref:'Group'

    },
    participants:[{
          user: {type:mongoose.Schema.ObjectId,
          ref:'User'},
          status: { 
            type: String, 
            enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending'
        }
    }]
    
})

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;