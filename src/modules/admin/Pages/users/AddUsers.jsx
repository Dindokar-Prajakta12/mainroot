import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "./AddUser.css";

const AddUser = () => {
  const { setUsers } = useOutletContext(); // ✅ CONNECTED

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    role: "",
    timezone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      id: Date.now(), // unique id
      name: formData.name,
      email: formData.email,
      role: formData.role
    };

    setUsers((prev) => [...prev, newUser]); // ✅ PUSH TO ALL USERS

    alert("User added successfully!");

    setFormData({
      name: "",
      email: "",
      username: "",
      role: "",
      timezone: ""
    });
  };

  return (
    <div className="add-user-page">
      <h2 className="page-title">Add User Registration</h2>

      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Timezone</label>
          <select
            name="timezone"
            value={formData.timezone}
            onChange={handleChange}
          >
            <option value="">Select timezone</option>
            <option value="IST">IST</option>
            <option value="UTC">UTC</option>
            <option value="EST">EST</option>
          </select>
        </div>

        <div className="form-group">
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select role</option>
            <option value="Intern">Intern</option>
            <option value="Developer">Developer</option>
            <option value="Tester">Tester / QA</option>
            <option value="Support Engineer">Support Engineer</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
            <option value="Team Lead">Team Lead</option>
            <option value="Manager">Manager</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Save User
          </button>
          <button type="reset" className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
