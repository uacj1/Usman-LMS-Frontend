import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Student' });
  const { API_URL } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/register`, formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed: ' + err.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '300px', margin: '0 auto' }}>
      <h2>Register</h2>
      <input style={{ width: '100%', padding: '8px', marginBottom: '10px' }} type="text" placeholder="Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
      <input style={{ width: '100%', padding: '8px', marginBottom: '10px' }} type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
      <input style={{ width: '100%', padding: '8px', marginBottom: '10px' }} type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
      <select style={{ width: '100%', padding: '8px', marginBottom: '10px' }} value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
        <option value="Student">Student</option>
        <option value="Instructor">Instructor</option>
        <option value="Admin">Admin</option>
      </select>
      <button style={{ width: '100%', padding: '10px', background: 'green', color: 'white', border: 'none' }} type="submit">Register</button>
    </form>
  );
};