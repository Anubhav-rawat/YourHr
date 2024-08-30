const express = require("express");
const multer = require("multer");
const bcrypt = require("bcryptjs"); 
const router = express.Router();
const upload = multer({ dest: "uploads/" });
const User = require("../models/User");

// API route to handle signup with file upload
router.post("/signup", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const resume = req.file ? req.file.path : null;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword, // Save hashed password
      resume,
    });

    await newUser.save();

    // Respond with user data (excluding password)
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      resume: newUser.resume,
      message: "User registered successfully!",
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// API route to get user information by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Responding with user data (excluding password)
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      resume: user.resume,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
