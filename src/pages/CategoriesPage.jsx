// src/pages/CategoriesPage.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import '../styles/PageStyle.css';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axiosInstance.get('/categories/')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  return (
    <div className="page-container">
      <h2 className="page-title">📂 Categories</h2>
      <ul className="styled-list">
        {categories.map(category => (
          <li key={category.id}>📁 {category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
