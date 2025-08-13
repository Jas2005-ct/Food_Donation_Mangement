import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './DonarDashboardStyle.css';

function DonorDashboard() {
  const [donations, setDonations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    meal_type: 'breakfast',
    pickup_location: '',
    contact_number: '',
  });

  const email = localStorage.getItem('email') || '';
  const userType = localStorage.getItem('user_type') || '';

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await api.get('donor/donations/');
      setDonations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('donor/donations/', formData);
      fetchDonations();
      setFormData({
        title: '',
        description: '',
        quantity: '',
        meal_type: 'breakfast',
        pickup_location: '',
        contact_number: '',
      });
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <span className="logo">FoodShare</span>
          <nav>
            <a href="/" className="header-link">Home</a>
            <a href="#" className="header-link">Overview</a>
          </nav>
        </div>
        <div className="header-right">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
          <div className="profile-icon" onClick={() => setShowProfile(!showProfile)}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile"
              className="profile-img"
            />
          </div>
          {showProfile && (
            <div className="profile-dropdown">
              <p><strong>Email:</strong> {email}</p>
              <p><strong>User Type:</strong> {userType}</p>
              <p><strong>Total Donations:</strong> {donations.length}</p>
              <button onClick={() => setShowProfile(false)}>Close</button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-actions">
          <button className="donate-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Close Form' : 'Donate Food'}
          </button>
        </div>

        {/* Donation Form */}
        {showForm && (
          <form className="donation-form" onSubmit={handleSubmit}>
            <h3>Donate Food</h3>
            <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
            <input name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
            <select name="meal_type" value={formData.meal_type} onChange={handleChange}>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
            <input name="pickup_location" placeholder="Pickup Location" value={formData.pickup_location} onChange={handleChange} required />
            <input name="contact_number" placeholder="Contact Number" value={formData.contact_number} onChange={handleChange} required />
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        )}

        {/* Donations List */}
        <section className="donations-list-section">
          <h3>Your Donations</h3>
          <ul className="donations-list">
            {donations.map(d => (
              <li key={d.id} className="donation-item">
                <div>
                  <strong>{d.title}</strong> ({d.meal_type}) - {d.quantity} - <span className="status">{d.status}</span>
                </div>
                <div className="donation-details">
                  <span>{d.description}</span>
                  <span>Pickup: {d.pickup_location}</span>
                  <span>Contact: {d.contact_number}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default DonorDashboard;