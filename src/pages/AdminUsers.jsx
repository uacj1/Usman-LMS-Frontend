import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export const AdminUsers = () => {
  const [list, setList] = useState([]);
  const { API_URL } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${API_URL}/users`, { headers: { Authorization: `Bearer ${token}` }}).then(res => setList(res.data));
  }, [API_URL]);

  const removeUser = async (id) => {
    const token = localStorage.getItem('token');
    if (window.confirm("Confirm delete?")) {
      await axios.delete(`${API_URL}/users/${id}`, { headers: { Authorization: `Bearer ${token}` }});
      setList(list.filter(u => u._id !== id));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>User Management</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead><tr style={{ background: '#333', color: '#fff' }}><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr></thead>
        <tbody>
          {list.map(u => (
            <tr key={u._id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td><button onClick={() => removeUser(u._id)} style={{color: 'red'}}>Delete</button></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
