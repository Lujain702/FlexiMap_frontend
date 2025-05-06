import React, { useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import { useNavigate } from 'react-router-dom';

const MapForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await axiosInstance.post('/maps/', { name, description });
      alert('🗺️ Map created successfully!');
      navigate('/dashboard'); 
    } catch (error) {
      console.error('❌ Failed to create map:', error);
      alert('Something went wrong! 🥲');
    }
  };

  return (
    <div className="map-form-container">
      <h2>➕ Create New Map</h2>
      <form onSubmit={handleSubmit} className="map-form">
        <label>
          📝 Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          📄 Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <button type="submit">🚀 Submit</button>
      </form>
    </div>
  );
};

export default MapForm;
