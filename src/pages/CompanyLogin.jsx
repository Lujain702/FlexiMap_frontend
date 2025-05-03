import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/SignupPage.css'; 
import { loginCompany } from '../services/authService'; 

const CompanyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password 🧐');
      return;
    }

    try {
      const response = await loginCompany({
        email,
        password
      });
       
      console.log('Company login success:', response);
    } catch (err) {
      console.error('Company login failed:', err);
      setError('Invalid login credentials');
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
          <h2>Company Login 🔐</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your company email 🏢"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password 🔑"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="signup-btn">Login</button>
          </form>

          <p className="login-link">
            Don't have a company account? <Link to="/company-register">Register here 📝</Link>
          </p>
        </motion.div>
      </div>

      <div className="signup-left">
        <h1>Welcome Back, Company Admin! 🏢</h1>
        <p>Log in to manage your maps, locations, and insights for your business 🌍📊</p>
      </div>
    </div>
  );
};

export default CompanyLogin;
