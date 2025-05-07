// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
// import './Navbar.css';





import {
  FaSignInAlt,
  FaUserPlus,
  FaMapMarkedAlt,
  FaSignOutAlt,
  FaUserShield,
  FaMap,
  FaThumbtack,
  FaUserCircle,
  FaBuilding,
  FaBars,
} from 'react-icons/fa';
const hoverSound = new Audio('/FlexiMap.mp3');
const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully 👋');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div
  className="logo"
  onClick={() => navigate('/')}
  onMouseEnter={() => {
    hoverSound.currentTime = 0;
    hoverSound.play();
  }}
>
  <span>FlexiMap🌍🗺️</span>
</div>

      <ul className="nav-links">

        {!isLoggedIn ? (
          <>
            <li><Link to="/signup"><FaUserPlus /> Sign Up 📝</Link></li>
            <li><Link to="/login"><FaSignInAlt /> Login 🔐</Link></li>
            <li><Link to="/company-register"><FaUserShield /> Company Register 🏢</Link></li>
            <li><Link to="/company-login"><FaSignInAlt /> Company Login 🏢</Link></li>
          </>
        ) : (
          <>
            <li className="dropdown">
              <button className="dropbtn"><FaBars /> Dashboards 📂</button>
              <div className="dropdown-content">
                <Link to="/company/dashboard"><FaBuilding /> Company Dashboard 🏢</Link>
                <Link to="/user/dashboard"><FaUserCircle />User Dashboard 👤 </Link>
                <Link to="/maps/new"><FaMapMarkedAlt /> Create Map 🗺️</Link>
                {/* <Link to="/markers/new"><FaThumbtack />Add Marker 📍 </Link> */}
                <Link to="/markers"><FaMap /> All Markers 📌</Link>
                {/* <Link to="/categories"><FaMap /> Categories 📂</Link> */}
                {/* <Link to="/tags"><FaMap /> Tags 🎯</Link> */}
                {/* <Link to="/map"><FaMap /> Explore Riyadh 🗺️</Link> */}
                <Link to="/markers/add"> Add Marker➕</Link>
              </div>
            </li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                <FaSignOutAlt />  Logout 🚪
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
