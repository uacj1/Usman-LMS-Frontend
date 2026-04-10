import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboards } from './pages/Dashboards';
import { AdminUsers } from './pages/AdminUsers';
import { CourseDetail } from './pages/CourseDetail';
import { Profile } from './pages/Profile';
import { About } from './pages/About';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav style={{ padding: '15px', background: '#222', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Link to="/" style={{ color: '#fff', marginRight: '20px', textDecoration: 'none', fontWeight: 'bold' }}>LMS Portal</Link>
        <Link to="/about" style={{ color: '#fff', marginRight: '20px', textDecoration: 'none' }}>About</Link>
        {user && <Link to="/dashboard" style={{ color: '#fff', marginRight: '20px', textDecoration: 'none' }}>Dashboard</Link>}
        {user?.role === 'Admin' && <Link to="/admin-users" style={{ color: '#fff', marginRight: '20px', textDecoration: 'none' }}>Users</Link>}
      </div>
      <div>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Link to="/profile" style={{ color: '#fff', textDecoration: 'none' }}>{user.name}</Link>
            <button onClick={logout} style={{ background: '#e74c3c', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
          </div>
        ) : (
          <>
            <Link to="/login" style={{ color: '#fff', marginRight: '15px', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<div style={{padding:'50px', textAlign:'center'}}><h1>MERN Stack LMS</h1><p>Skill Development Initiative</p></div>} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboards /></ProtectedRoute>} />
          <Route path="/admin-users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
