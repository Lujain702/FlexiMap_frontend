import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import '../styles/SignupPage.css';
import { registerUser } from '../services/authService'; 

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('All fields are required! 🤓');
      return;
    }

    try {
      const response = await registerUser({
        email,
        password
      });
      console.log('User registered:', response);
      navigate('/login'); 
    } catch (err) {
      console.error('Signup error:', err);
      if (err.response?.data?.error?.includes("UNIQUE constraint")) {
        setError('Email already exists ❗');
      } else {
        setError('Registration failed 🚫');
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-right">
        <motion.div
          className="signup-form"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Create Account ✨</h2>
          <form onSubmit={handleSignup}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email 📧"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Make it strong 💪"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="signup-btn">Sign Up</button>
          </form>

          <p className="company-register-link">
            Want to register your company? <Link to="/company-register">Click here 🏢</Link>
          </p>

          <p className="login-link">
            Already have an account? <Link to="/login">Login here 🔑</Link>
          </p>
        </motion.div>
      </div>

      <div className="signup-left">
        <h1>Welcome Aboard! 🚀</h1>
        <p>Join FlexiMap and start marking your world with pins 🌍📍</p>
      </div>
    </div>
  );
};

export default SignupPage;
