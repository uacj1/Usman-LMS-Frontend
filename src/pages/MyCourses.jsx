import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export const MyCourses = () => {
  const [enrolled, setEnrolled] = useState([]);
  const { API_URL } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${API_URL}/my-courses`, { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        setEnrolled(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMyData();
  }, [API_URL]);

  return (
    <div style={{ padding: '30px' }}>
      <h2>Academic Records</h2>
      {enrolled.length === 0 ? <p>No active enrollments found.</p> : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {enrolled.map(item => (
            <div key={item._id} style={{ padding: '20px', border: '1px solid #28a745', borderRadius: '10px', width: '260px' }}>
              <h4>{item.course?.title}</h4>
              <p>Status: Active</p>
              <div style={{ width: '100%', height: '8px', background: '#eee', borderRadius: '4px' }}>
                <div style={{ width: `${item.progress}%`, height: '100%', background: '#28a745', borderRadius: '4px' }}></div>
              </div>
              <p style={{ fontSize: '12px' }}>Completed: {item.progress}%</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};