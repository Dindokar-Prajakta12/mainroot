import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { login as loginApi } from "../../api/authApi";
import { roleRedirect } from "../utils/roleRedirect";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(roleRedirect(user?.role || "admin"));
    }
  }, [user, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      console.log("Sending:", { email, password }); // debug

      const response = await loginApi(email, password);

      login(response.token, response.user);

      // role-based redirect is handled inside AuthContext.login()
    } catch (error) {
      console.log("Error:", error);
      setError(
        error?.detail ||
        error?.non_field_errors?.[0] ||
        "Invalid email or password."
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-left">
          <div className="overlay">
            <h1>Hello<br />World.</h1>
            <p>Welcome to admin panel</p>
          </div>
        </div>

        <div className="login-right">
          <h2>Login</h2>
          <span>Welcome back, please sign in.</span>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>

            {error && <div className="form-error">{error}</div>}

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <p className="register-text">
            <Link to="/forgot-password">Forgot password?</Link>
          </p>

          <p className="register-text">
            First time here? <Link to="/register">Register now</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;