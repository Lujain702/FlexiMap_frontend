// src/services/authService.js
import axiosInstance from './axiosInstance';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const registerUser = async (userData) => {
  return await axiosInstance.post(`/signup/`, {
    email: userData.email,
    password: userData.password,
  });
};

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post(`/login/`, {
    email: credentials.email,
    password: credentials.password,
  });

  if (response.data.token) {
    localStorage.setItem('token', response.data.token); 
  }

  return response.data;
};

export const registerCompany = async (companyData) => {
  return await axiosInstance.post(`/company/signup/`, {
    company_name: companyData.company_name,
    email: companyData.email,
    password: companyData.password,
  });
};

export const loginCompany = async (credentials) => {
  const response = await axiosInstance.post(`/company/login/`, {
    company_name: credentials.company_name,
    password: credentials.password,
  });

  if (response.data.token) {
    localStorage.setItem('token', response.data.token); 
  }

  return response.data;
};
