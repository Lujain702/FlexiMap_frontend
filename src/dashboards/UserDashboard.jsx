import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import { useNavigate } from 'react-router-dom';
import "../styles/UserDashboard.css";
 // إضافة التنسيق الخاص بالـ Dashboard

const UserDashboard = () => {
  const [maps, setMaps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    axiosInstance.get('/maps/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setMaps(res.data))
    .catch(err => console.error('Error fetching maps 💥', err));
  }, []);

  return (
    <div className="dashboard">
      <h2 className="welcome-text"> Welcome back👋!</h2>
      <h3>Your Maps 🗺️</h3>

      {maps.length === 0 ? (
        <p>No maps found. Let's create one! ✨</p>
      ) : (
        <ul className="maps-list">
          {maps.map(map => (
            <li key={map.id} className="map-item">
              <strong>{map.name}</strong> — {map.description}
              <br />
              <button
                onClick={() => navigate(`/maps/${map.id}`)}
                className="view-map-btn"
              >
                View Map 📍
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDashboard;
