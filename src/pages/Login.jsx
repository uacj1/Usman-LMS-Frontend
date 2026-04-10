import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed. Check credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '300px', margin: '0 auto' }}>
      <h2>Login</h2>
      <div style={{ marginBottom: '10px' }}>
        <input style={{ width: '100%', padding: '8px' }} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input style={{ width: '100%', padding: '8px' }} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button style={{ width: '100%', padding: '10px', background: 'blue', color: 'white', border: 'none' }} type="submit">Login</button>
    </form>
  );
};
