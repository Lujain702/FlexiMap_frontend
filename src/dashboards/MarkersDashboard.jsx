import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';


const MarkersDashboard = () => {
  const [markers, setMarkers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:8000/api/markers/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMarkers(response.data);
      } catch (error) {
        console.error('❌ Failed to fetch markers:', error);
      }
    };

    fetchMarkers();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/markers/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMarkers(markers.filter(marker => marker.id !== id));
      alert('🗑️ Marker deleted!');
    } catch (error) {
      console.error('❌ Error deleting marker:', error);
    }
  };

  return (
    <div className="markers-dashboard">
      <h2>📍 All Markers</h2>
      <ul>
        {markers.map(marker => (
          <li key={marker.id}>
            <strong>{marker.name}</strong> – {marker.description}
            <button onClick={() => handleDelete(marker.id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarkersDashboard;
