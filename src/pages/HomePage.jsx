import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="nav-center">
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
            <Link to="/login">
              <button className="cta-btn">Get Started</button>
            </Link>
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
