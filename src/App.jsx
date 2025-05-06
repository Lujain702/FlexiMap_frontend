import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';

import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import CompanyRegister from './pages/CompanyRegister';
import CompanyLogin from './pages/CompanyLogin';

import CompanyDashboard from './dashboards/CompanyDashboard';
import UserDashboard from './dashboards/UserDashboard';
import MapForm from './dashboards/MapForm';
import MarkerForm from './dashboards/MarkerForm';
import MapDetails from './dashboards/MapDetails';
import MarkersDashboard from './dashboards/MarkersDashboard';

import { AuthProvider } from './context/AuthContext';
import MapPage from './pages/MapPage';
import MarkersPage from './pages/MarkersPage';
import TagsPage from './pages/TagsPage';
import CategoriesPage from './pages/CategoriesPage';
import AddMarkerForm from './pages/AddMarkerForm';


function App() {
  return (
    <AuthProvider>
      <ToastContainer position="top-center" autoClose={3000} />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/company-register" element={<CompanyRegister />} />
        <Route path="/company-login" element={<CompanyLogin />} />
        <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/maps/new" element={<MapForm />} />
        <Route path="/markers/new" element={<MarkerForm />} />
        <Route path="/maps/:id" element={<MapDetails />} />
        <Route path="/markers" element={<MarkersDashboard />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/markers" element={<MarkersPage />} />
        <Route path="/tags" element={<TagsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/dashboard/MapForm" element={<MapForm />} />
        <Route path="/markers/add" element={<AddMarkerForm />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
