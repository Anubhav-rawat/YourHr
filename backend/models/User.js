
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true }, 
  resume: { type: String }, 
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
