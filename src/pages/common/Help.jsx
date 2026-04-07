import "./Help.css";

const Help = () => {
  return (
    <div className="help-container">
      <div className="help-card">
        <h2>🆘 Help & Support</h2>

        <p>
          If you are facing any issues, please check the information below
          or contact our support team.
        </p>

        <div className="help-section">
          <h4>📧 Email Support</h4>
          <p>support@yourcompany.com</p>
        </div>

        <div className="help-section">
          <h4>📞 Phone Support</h4>
          <p>+91 9876543210</p>
        </div>

        <div className="help-section">
          <h4>🕒 Working Hours</h4>
          <p>Monday - Friday (9 AM - 6 PM)</p>
        </div>

        <button className="help-btn">Contact Support</button>
      </div>
    </div>
  );
};

export default Help;