const User= require('../models/user.js');
const Task = require('../models/Task.js');
const GroupSchema = require('../models/group.js');
const group = require('../models/group.js');

const Group = async(req,res) =>{
    try{
        const { groupname, code} = req.body;
        
        const codeExist = await GroupSchema.findOne({code})
        if(codeExist){
            return res.status(400).json({message:"Code is already being Used"})
        }

        const newGroup = new GroupSchema({
            groupname,
            code,
            members:[req.user._id],
            createBy:req.user._id

        });
        await newGroup.save();
        res.status(201).json({message: "Group creation Successful"})
    }
    catch(error){
        res.status(500).json({error:error.message});
    }

}

module.exports = {Group}