// src/pages/TagsPage.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import '../styles/PageStyle.css'; 

const TagsPage = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axiosInstance.get('/tags/')
      .then(res => setTags(res.data))
      .catch(err => console.error('Error fetching tags:', err));
  }, []);

  return (
    <div className="page-container">
      <h2 className="page-title">🎯 All Tags</h2>
      <ul className="styled-list">
        {tags.map(tag => (
          <li key={tag.id}>🏷️ {tag.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TagsPage;
