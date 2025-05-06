import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import { useNavigate } from 'react-router-dom';

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
      <h2> Welcome back👋!</h2>
      <h3>Your Maps 🗺️</h3>

      {maps.length === 0 ? (
        <p>No maps found. Let's create one! ✨</p>
      ) : (
        <ul>
          {maps.map(map => (
            <li key={map.id} style={{ marginBottom: '10px' }}>
              <strong>{map.name}</strong> — {map.description}
              <br />
              <button
                onClick={() => navigate(`/maps/${map.id}`)}
                style={{
                  marginTop: '5px',
                  padding: '5px 10px',
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
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
