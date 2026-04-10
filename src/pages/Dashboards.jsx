import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export const Dashboards = () => {
  const { user, API_URL } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({ totalCourses: 0, totalEnrollments: 0 });
  const [formData, setFormData] = useState({ title: '', description: '', price: 0, category: 'General' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Fetch all courses
    axios.get(`${API_URL}/courses`)
      .then(res => setCourses(res.data))
      .catch(err => console.error("Failed to load courses:", err));
    
    // Fetch analytics if Admin
    if (user?.role === 'Admin') {
      axios.get(`${API_URL}/analytics`, { headers: { Authorization: `Bearer ${token}` }})
        .then(res => setStats(res.data))
        .catch(err => console.error("Failed to load stats:", err));
    }
  }, [API_URL, user?.role]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${API_URL}/courses`, formData, { headers: { Authorization: `Bearer ${token}` }});
      window.location.reload();
    } catch (err) { 
      alert("Operation failed. Please check your inputs."); 
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (window.confirm("Are you sure you want to remove this course?")) {
      try {
        await axios.delete(`${API_URL}/courses/${id}`, { headers: { Authorization: `Bearer ${token}` }});
        setCourses(courses.filter(c => c._id !== id));
      } catch (err) {
        alert("Failed to delete course.");
      }
    }
  };

  const handleEnroll = async (courseId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${API_URL}/enroll`, { courseId }, { headers: { Authorization: `Bearer ${token}` }});
      alert("Enrolled successfully!");
    } catch (err) { 
      alert("You are already enrolled or an error occurred."); 
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>{user?.role} Dashboard</h2>

      {/* Admin Analytics Section */}
      {user?.role === 'Admin' && (
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
          <div style={{ flex: 1, padding: '20px', background: '#f8f9fa', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>Courses Active</h4>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.totalCourses}</span>
          </div>
          <div style={{ flex: 1, padding: '20px', background: '#f8f9fa', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>Total Enrollments</h4>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.totalEnrollments}</span>
          </div>
        </div>
      )}

      {/* Course Creation Form (Admin/Instructor) */}
      {(user?.role === 'Instructor' || user?.role === 'Admin') && (
        <div style={{ marginBottom: '40px', padding: '25px', border: '1px solid #ddd', borderRadius: '8px', background: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: '0' }}>Add New Course</h3>
          <form onSubmit={handleCreate} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <input style={{ flex: '1 1 200px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} type="text" placeholder="Course Title" onChange={e => setFormData({...formData, title: e.target.value})} required />
            <input style={{ flex: '1 1 200px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} type="text" placeholder="Category (e.g., Web Dev)" onChange={e => setFormData({...formData, category: e.target.value})} required />
            <input style={{ flex: '2 1 100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} type="text" placeholder="Full Description" onChange={e => setFormData({...formData, description: e.target.value})} required />
            <input style={{ flex: '1 1 150px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} type="number" placeholder="Price (Rs.)" onChange={e => setFormData({...formData, price: e.target.value})} required />
            <button type="submit" style={{ flex: '1 1 150px', padding: '10px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Publish Course</button>
          </form>
        </div>
      )}

      {/* Course Listing */}
      <h3>Available Modules</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {courses.map(c => (
          <div key={c._id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', background: '#fff', display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ marginTop: '0', marginBottom: '5px', fontSize: '1.2rem' }}>{c.title}</h4>
            <span style={{ fontSize: '0.8rem', color: '#fff', background: '#6c757d', padding: '3px 8px', borderRadius: '12px', alignSelf: 'flex-start', marginBottom: '10px' }}>{c.category}</span>
            <p style={{ color: '#555', fontSize: '0.95rem', flexGrow: 1 }}>{c.description}</p>
            <p style={{ fontSize: '1.1rem' }}><strong>Fee: Rs. {c.price}</strong></p>
            
            {user?.role === 'Student' && (
              <button onClick={() => handleEnroll(c._id)} style={{ width: '100%', padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Enroll Now</button>
            )}

            {(user?.role === 'Instructor' || user?.role === 'Admin') && (
              <button onClick={() => handleDelete(c._id)} style={{ marginTop: '10px', color: '#dc3545', border: '1px solid #dc3545', background: 'transparent', padding: '8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Remove Course</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};