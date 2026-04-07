import React, { useState, useEffect } from "react";
import "./MyProfile.css";

const MyProfile = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      localStorage.setItem("profileImage", reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>My Profile</h2>

        <div className="profile-image-section">
          <img
            src={image || "https://via.placeholder.com/130"}
            alt="Profile"
            className="profile-image"
          />

          <label className="upload-btn">
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
            />
          </label>
        </div>

        <div className="profile-info">
          <div className="info-row">
            <span>Name</span>
            <span>Admin User</span>
          </div>
          <div className="info-row">
            <span>Email</span>
            <span>admin@gmail.com</span>
          </div>
          <div className="info-row">
            <span>Phone</span>
            <span>+91 9876543210</span>
          </div>
          <div className="info-row">
            <span>Role</span>
            <span>Admin</span>
          </div>
          <div className="info-row">
            <span>Status</span>
            <span className="active-status">Active</span>
          </div>
          <div className="info-row">
            <span>Location</span>
            <span>Nagpur, India</span>
          </div>
          <div className="info-row">
            <span>Member Since</span>
            <span>Jan 2024</span>
          </div>
        </div>

        <button className="edit-btn">Edit Profile</button>
      </div>
    </div>
  );
};

export default MyProfile;