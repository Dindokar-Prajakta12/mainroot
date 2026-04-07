import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { register as registerApi } from "../../api/authApi";
import { roleRedirect } from "../utils/roleRedirect";
import "./register.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            navigate(roleRedirect(user.role));
        }
    }, [user, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await registerApi(name, email, password);
            setSuccess("Registration successful. Redirecting to login...");
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (error) {
            setError(error?.message || "Unable to register right now.");
        }
    };

    return (
        <div className="register-page">
            <div className="register-card">
                <div className="register-left">
                    <div className="register-overlay">
                        <h1>Welcome</h1>
                        <p>Create your account and join the dashboard.</p>
                    </div>
                </div>

                <div className="register-right">
                    <h2>Register</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Full name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="input-group">
                            <label>Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Enter password"
                            />
                        </div>

                        <div className="input-group">
                            <label>Confirm Password</label>
                            <input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                placeholder="Confirm password"
                            />
                        </div>

                        {error && <div className="form-error">{error}</div>}
                        {success && <div className="form-success">{success}</div>}

                        <button type="submit" className="login-btn">
                            Register
                        </button>
                    </form>

                    <p className="register-text">
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
