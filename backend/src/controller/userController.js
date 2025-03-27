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
