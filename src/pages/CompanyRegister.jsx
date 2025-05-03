import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/CompanyRegister.css';
import { registerCompany } from '../services/authService'; 

const CompanyRegister = () => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!companyName || !email || !password) {
      setError('Please fill in all fields 🛠️');
      return;
    }

    try {
      const response = await registerCompany({
        company_name: companyName,
        email,
        password
      });
      console.log('Company registered:', response);
    } catch (err) {
      console.error('Company registration failed:', err);
      setError('Registration failed');
    }
  };

  return (
    <div className="company-container">
      <div className="company-form-section">
        <motion.div
          className="company-form"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Register Your Company 🏢</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Company Name</label>
              <input
                type="text"
                placeholder="Awesome Inc. 💼"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="company@example.com 📧"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Secure password 🔒"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="company-btn">Register</button>
          </form>
        </motion.div>
      </div>

      <div className="company-welcome">
        <h1>FlexiMap for Companies 🌍</h1>
        <p>
          Manage your locations, track user pins, and build your spatial brand — all in one map! 🚀
        </p>
      </div>
    </div>
  );
};

export default CompanyRegister;
