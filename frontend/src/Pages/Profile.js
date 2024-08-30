import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; 
import "./Profile.css";

const Profile = () => {
  const { userId } = useParams(); // Getting userId from URL parameters
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError("User ID is not provided.");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://yourhr-k7wc.onrender.com/${userId}`
        );
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Error fetching user data.");
      }
    };

    fetchUser();
  }, [userId]);

  if (error) return <div className="error-message">{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">User Profile</h2>
        <div className="profile-details">
          <div className="profile-item">
            <label>Name:</label>
            <span>{user.name}</span>
          </div>
          <div className="profile-item">
            <label>Email:</label>
            <span>{user.email}</span>
          </div>
          <div className="profile-item">
            <label>Phone:</label>
            <span>{user.phone}</span>
          </div>
          {user.resume && (
            <div className="profile-item">
              <label>Resume:</label>
              <a
                href={`https://yourhr-k7wc.onrender.com/${user.resume}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
