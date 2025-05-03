import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import '../styles/LoginPage.css';
import { loginUser } from '../services/authService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await loginUser({
        email,
        password
      });

      console.log('Login successful:', response);

      login(); 
      toast.success('Logged in successfully ✅'); 
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials');
      toast.error('Login failed ❌');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <motion.div
          className="login-form"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Login to FlexiMap</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </div>

            <div className="options-row">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="login-btn">Login</button>
          </form>

          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>

          <p className="company-login-link">
            Are you a company? <Link to="/company-login">Login as Company 🏢</Link>
          </p>
        </motion.div>
      </div>

      <div className="login-right">
        <h1>Welcome to FlexiMap 🌍</h1>
        <p>Discover, create, and share your favorite locations with ease.</p>
      </div>
    </div>
  );
};

export default LoginPage;
