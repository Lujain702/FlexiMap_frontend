import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import CompanyRegister from './pages/CompanyRegister';
import CompanyLogin from './pages/CompanyLogin';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';



function App() {
  <ToastContainer position="top-center" autoClose={3000} />
  return (
    <AuthProvider> 
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/company-register" element={<CompanyRegister />} /> 
      <Route path="/login-company" element={<CompanyLogin />} /> 
      <Route path="/company-login" element={<CompanyLogin />} />
    </Routes>
    </AuthProvider>
  );
}

export default App;
