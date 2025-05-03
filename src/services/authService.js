// src/services/authService.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api'; 

export const registerUser = async (userData) => {
  
  return await axios.post(`${API_BASE_URL}/signup/`, {
    email: userData.email,
    password: userData.password,
  });  
};


export const loginUser = async (credentials) => {
    return await axios.post(`${API_BASE_URL}/login/`, {
      email: credentials.email,   
      password: credentials.password,
    });
  };
  


export const registerCompany = async (companyData) => {
  return await axios.post(`${API_BASE_URL}/company/signup/`, {
    company_name: companyData.company_name,
    email: companyData.email,
    password: companyData.password,
  });
};


export const loginCompany = async (credentials) => {
  return await axios.post(`${API_BASE_URL}/company/login/`, {
    company_name: credentials.company_name,
    password: credentials.password,
  });
};
