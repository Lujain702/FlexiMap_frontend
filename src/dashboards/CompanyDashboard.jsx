import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';
import "../styles/CompanyDashboard.css";


const CompanyDashboard = () => {
  const [maps, setMaps] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMaps = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:8000/api/maps/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMaps(response.data);
      } catch (error) {
        console.error('❌ Error fetching maps:', error);
      }
    };

    fetchMaps();
  }, [token]);

  const handleCreate = () => {
    navigate('/dashboard/create-map');
  };

  return (
    <div className="company-dashboard">
      <h2>Company Dashboard🏢</h2>
      <button onClick={handleCreate} className="create-map-btn">
        Create New Map➕ 
      </button>
      <div className="map-list">
        {maps.length > 0 ? (
          <ul>
            {maps.map((map) => (
              <li key={map.id}>
                🗺️ <strong>{map.name}</strong> — {map.description}
              </li>
            ))}
          </ul>
        ) : (
          <p> No maps yet. Create your first one✨!</p>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
