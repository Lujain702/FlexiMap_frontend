import React, { useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../styles/AddMarkerForm.css'; 

const AddMarkerForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mapId = 1; 

      const response = await axiosInstance.post('/markers/', {
        name: title,
        description,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        category,
        tags,
        map: mapId,
      });

      toast.success('Marker added successfully✅!');
      console.log("Navigating to: ", `/maps/${mapId}`);
      navigate(`/maps/${mapId}`); 

      
      setTitle('');
      setDescription('');
      setLatitude('');
      setLongitude('');
      setCategory('');
      setTags([]);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      toast.error('Failed to add marker❌.');
    }
  };

  return (
    <div className="add-marker-form-container">
      <h2 className="form-title">Add New Marker📍</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Marker Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input-field"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="input-field"
        ></textarea>
        <input
          type="number"
          step="any"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="number"
          step="any"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
          className="input-field"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="input-field"
        >
          <option value="">Select Category</option>
          <option value="Park">🏞️ Park</option>
          <option value="Café">☕ Café</option>
          <option value="University">🏫 University</option>
          <option value="Food">🍽️ Food</option>
        </select>

        <div className="tag-options">
          {[
            'Family-friendly 🌿',
            'Instagrammable 📸',
            'Budget-friendly 💸',
            'Scenic Views 🌇',
            'Foodie Spot 🍽️',
            'University 🏫',
            'Educational 🎓',
            'Park',
            'River'
          ].map((tag, index) => (
            <label key={index} className="tag-checkbox">
              <input
                type="checkbox"
                value={tag}
                checked={tags.includes(tag)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setTags([...tags, tag]);
                  } else {
                    setTags(tags.filter((t) => t !== tag));
                  }
                }}
              />
              {tag}
            </label>
          ))}
        </div>

        <button type="submit" className="submit-btn">
          Add Marker ➕
        </button>
      </form>
    </div>
  );
};

export default AddMarkerForm;
