const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const signUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashpassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({
      userName,
      email,
      password: hashpassword,
    });
    await newUser.save();

    //  generate a JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      "process.env.secret_key", 
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "User created successfully", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login= async(req , res)=>{
  try{
    const {email,password}=req.body
     const user = await User.findOne({email})
     if(!user){
      return res.status(404).json({message:"User not found"})
     }
    //  check if the pass is valid or not
     const validpass = await bcrypt.compare(password, user.password);
     if (!validpass) {
         return res.status(401).json({ message: "Invalid password" });
     }
    //  generate jwt token 
     const token = jwt.sign(
      { id: user._id, email: user.email },
      "process.env.secret_key", 
      { expiresIn: "1h" }

     
    );

    res.json({token})

  }catch(err){
    res.status(500).json({message:err.message})
  }
}


module.exports={login,signUp}