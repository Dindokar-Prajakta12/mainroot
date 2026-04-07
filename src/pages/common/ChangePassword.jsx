import { useState } from "react";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.new !== password.confirm) {
      alert("New passwords do not match");
      return;
    }

    console.log("Password Changed:", password);
  };

  return (
    <div className="profile-container">
      <h2>🔐 Change Password</h2>

      <form className="profile-form" onSubmit={handleSubmit}>
        <label>Current Password</label>
        <input
          type="password"
          name="current"
          placeholder="Enter current password"
          onChange={handleChange}
        />

        <label>New Password</label>
        <input
          type="password"
          name="new"
          placeholder="Enter new password"
          onChange={handleChange}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirm"
          placeholder="Confirm new password"
          onChange={handleChange}
        />

        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;