import React from 'react';
import './Unauthorized.css'; // Custom CSS for this page

const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <div className="unauthorized-card">
        <h2>🚫 You are not authorized</h2>
        <p>You don’t have permission to access this page.</p>
      </div>
    </div>
  );
};

export default Unauthorized;