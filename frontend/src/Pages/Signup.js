import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Updated to use useNavigate
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    resume: null,
  });

  const navigate = useNavigate(); // Updated to use useNavigate

  const handleChange = (e) => {
    if (e.target.name === "resume") {
      setFormData({ ...formData, resume: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("password", formData.password);
    data.append("resume", formData.resume);

    try {
      const response = await axios.post(
        "https://yourhr-k7wc.onrender.com/api/users/signup",
        data
      );
      alert("Signup successful!");

      // Redirect to profile page after successful signup
      const userId = response.data._id; // Get user ID from response
      navigate(`/profile/${userId}`);

      // Reset form fields after successful signup
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        resume: null,
      });
    } catch (err) {
      alert("Error during signup!");
      console.error(err); // Log the error
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create Your Account</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="input-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Resume:</label>
          <input type="file" name="resume" onChange={handleChange} />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
