// src/pages/MarkersPage.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import '../styles/MarkersPage.css';

const MarkersPage = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await axiosInstance.get('/markers/');
        setMarkers(response.data);
      } catch (error) {
        console.error('Error fetching markers:', error);
      }
    };

    fetchMarkers();
  }, []);

  return (
    <div className="markers-wrapper">
      <h1 className="markers-title">All Markers📍 </h1>
      <div className="markers-grid">
        {markers.map(marker => (
          <div key={marker.id} className="marker-card">
            <h2>{marker.title} 📌</h2>
            <p>{marker.description}</p>
            <p>🗺️ Lat: {marker.lat} | Lng: {marker.lng}</p>
            <a href={`/maps/${marker.id}`} className="view-map-link">🌍 View on Map</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarkersPage;
