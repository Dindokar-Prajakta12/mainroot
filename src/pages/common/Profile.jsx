import { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    gender: "",
    role: "User", // This can be dynamic based on the user
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Data:", formData);
  };

  return (
    <div className="profile-container">
      <h2>👤 My Profile</h2>

      <form className="profile-form" onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter full name"
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
        />

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          placeholder="Enter phone number"
          onChange={handleChange}
        />

        <label>Address</label>
        <input
          type="text"
          name="address"
          placeholder="Enter address"
          onChange={handleChange}
        />

        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          onChange={handleChange}
        />

        <label>Gender</label>
        <select name="gender" onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Other">Other</option>
        </select>

        <label>Role</label>
        <input
          type="text"
          name="role"
          value={formData.role} // Dynamic role value
          disabled
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;