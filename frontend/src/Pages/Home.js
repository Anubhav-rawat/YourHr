import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; 

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to YourHR</h1>
        <p className="hero-subtitle">
          Your gateway to your next job opportunity
        </p>
        <Link to="/signup">
          <button className="hero-button">Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
