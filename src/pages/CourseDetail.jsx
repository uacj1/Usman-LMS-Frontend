import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export const CourseDetail = () => {
  const { id } = useParams();
  const { API_URL } = useContext(AuthContext);
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/courses/${id}`).then(res => setItem(res.data));
  }, [id, API_URL]);

  if (!item) return <div style={{padding: '50px'}}>Loading...</div>;

  return (
    <div style={{ padding: '50px' }}>
      <h1>{item.title}</h1>
      <p style={{ color: '#666' }}>Category: {item.category}</p>
      <hr />
      <p style={{ margin: '20px 0' }}>{item.description}</p>
      <h3>Enrollment Fee: Rs. {item.price}</h3>
    </div>
  );
};
