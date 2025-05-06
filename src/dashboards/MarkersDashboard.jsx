import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import "../styles/MarkersDashboard.css";

const MarkersDashboard = () => {
  const [markers, setMarkers] = useState([]);
  const [editingMarker, setEditingMarker] = useState(null); // 👈 لتحديد العنصر الذي يتم تعديله
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchMarkers();
  }, [token]);

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

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`http://localhost:8000/api/markers/${id}/`, {
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

  const handleEditChange = (e) => {
    setEditingMarker({ ...editingMarker, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`http://localhost:8000/api/markers/${editingMarker.id}/`, editingMarker, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('✅ Marker updated successfully!');
      setEditingMarker(null);
      fetchMarkers();
    } catch (error) {
      console.error('❌ Error updating marker:', error);
    }
  };

  return (
    <div className="markers-dashboard">
      <h2> All Markers Dashboard📍</h2>
      <ul>
        {markers.map(marker => (
          <li key={marker.id}>
            <strong>📌 {marker.name}</strong> – {marker.description}
            <button onClick={() => handleDelete(marker.id)} style={{ marginLeft: "10px" }}> Delete🗑️</button>
            <button onClick={() => setEditingMarker(marker)} style={{ marginLeft: "5px" }}> Edit✏️</button>
          </li>
        ))}
      </ul>

      {editingMarker && (
        <form onSubmit={handleUpdate} className="edit-form">
          <h3> Edit Marker🛠️</h3>
          <label>
             Name📝:
            <input
              type="text"
              name="name"
              value={editingMarker.name}
              onChange={handleEditChange}
              required
            />
          </label>
          <label>
            Description📖:
            <textarea
              name="description"
              value={editingMarker.description}
              onChange={handleEditChange}
              required
            />
          </label>
          <button type="submit">Save💾</button>
          <button type="button" onClick={() => setEditingMarker(null)} style={{ marginLeft: "10px" }}>Cancel❌</button>
        </form>
      )}
    </div>
  );
};

export default MarkersDashboard;
