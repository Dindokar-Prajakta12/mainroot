import { useState } from "react";
import { Link } from "react-router-dom";
import { sendOtp, verifyOtp, resetPassword } from "../../api/authApi";
import "./forgot-password.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState("email");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSendOtp = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      const response = await sendOtp(email);
      setMessage(response.detail || "OTP sent successfully.");
      setStep("verify");
    } catch (err) {
      setError(err?.detail || "Unable to send OTP right now.");
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!otp) {
      setError("Please enter the OTP code sent to your email.");
      return;
    }

    try {
      const response = await verifyOtp(email, otp);
      setMessage(response.detail || "OTP verified successfully.");
      setStep("reset");
    } catch (err) {
      setError(err?.detail || "The OTP is invalid or expired.");
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!newPassword || !confirmPassword) {
      setError("Please enter and confirm your new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await resetPassword(email, otp, newPassword);
      setMessage(response.detail || "Password updated successfully.");
      setStep("done");
    } catch (err) {
      setError(err?.detail || "We could not reset your password.");
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <div className="forgot-left">
          <h1>Reset Password</h1>
          <p>Use email OTP to verify your account and set a new password.</p>
          <Link to="/login" className="forgot-link">Back to Login</Link>
        </div>

        <div className="forgot-right">
          <h2>OTP Recovery</h2>

          {message && <div className="form-success">{message}</div>}
          {error && <div className="form-error">{error}</div>}

          {step === "email" && (
            <form onSubmit={handleSendOtp} className="forgot-form">
              <label>Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              <button type="submit" className="forgot-btn">Send OTP</button>
            </form>
          )}

          {step === "verify" && (
            <form onSubmit={handleVerifyOtp} className="forgot-form">
              <label>OTP code</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP code"
              />
              <button type="submit" className="forgot-btn">Verify OTP</button>
            </form>
          )}

          {step === "reset" && (
            <form onSubmit={handleResetPassword} className="forgot-form">
              <label>New password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />

              <label>Confirm password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />

              <button type="submit" className="forgot-btn">Reset Password</button>
            </form>
          )}

          {step === "done" && (
            <div className="forgot-done">
              <p>Your password has been updated successfully.</p>
              <Link to="/login" className="forgot-link">Go to login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
