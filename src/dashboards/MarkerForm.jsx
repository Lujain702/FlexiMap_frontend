// src/dashboards/MarkerForm.jsx

import React, { useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import { useNavigate } from 'react-router-dom';

const MarkerForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    latitude: '',
    longitude: '',
    map: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('http://localhost:8000/api/markers/', formData);
      alert('📍 Marker added successfully!');
      navigate('/markers');
    } catch (error) {
      console.error('Error adding marker:', error);
      alert('❌ Failed to add marker.');
    }
  };

  return (
    <div className="marker-form">
      <h2>📍 Add New Marker</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Marker Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Marker Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="latitude"
          placeholder="Latitude"
          value={formData.latitude}
          onChange={handleChange}
          step="any"
          required
        />
        <input
          type="number"
          name="longitude"
          placeholder="Longitude"
          value={formData.longitude}
          onChange={handleChange}
          step="any"
          required
        />
        <input
          type="number"
          name="map"
          placeholder="Map ID"
          value={formData.map}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Marker🚀</button>
      </form>
    </div>
  );
};

export default MarkerForm;
