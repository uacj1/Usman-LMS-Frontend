import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <div style={{ border: '1px solid #ccc', padding: '30px', display: 'inline-block', borderRadius: '10px' }}>
        <h2>My Account</h2>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>
    </div>
  );
};
