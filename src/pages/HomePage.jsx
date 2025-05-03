import { Link, useNavigate } from 'react-router-dom';  // ✅ تأكد من استيراد useNavigate
import { motion } from 'framer-motion';
import '../styles/HomePage.css';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const HomePage = () => {
  const { isLoggedIn, logout } = useAuth();  
  const navigate = useNavigate();  
  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully 👋');
    navigate('/login');
  };

  return (
    <div className="nav-center">
      <nav className="navbar">
  <div className="nav-left" />

  <div className="nav-center">
    <h1 className="logo spinning-earth"> FlexiMap 🌍</h1>
  </div>

  <div className="nav-right">
    {isLoggedIn ? (
      <button onClick={handleLogout} className="nav-btn">Logout</button>
    ) : (
      <>
        <Link to="/login" className="nav-btn">Login</Link>
        <Link to="/signup" className="nav-btn secondary">Sign Up</Link>
      </>
    )}
  </div>
</nav>


      <main className="hero">
        <div className="hero-container"> 
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2>Discover, Create, and Share Your Maps</h2>
            <p>
              FlexiMap gives you full control over your maps! Add markers, comment, and share with your friends or the world.
            </p>
            {!isLoggedIn && (
              <Link to="/signup">
                <button className="cta-btn">Get Started</button>
              </Link>
            )}
          </motion.div>

          <div className="hero-video">
            <video autoPlay loop muted playsInline>
              <source src="/Map.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </main>

      <footer className="footer">
        © 2025 FlexiMap. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
