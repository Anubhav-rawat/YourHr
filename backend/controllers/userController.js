const User = require("../models/userModel");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, resume } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already used" });
    }

    const newUser = new User({
      name,
      email,
      phone,
      password,
      resume,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
