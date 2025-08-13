import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './NGODashboard.css';

function NGODashboard() {
  const [availableDonations, setAvailableDonations] = useState([]);
  const [claimedDonations, setClaimedDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const res = await api.get('/receiver/donations/');
      // Assuming your backend sends all donations and the frontend filters them
      const available = res.data.filter(d => d.status === 'Available');
      const claimed = res.data.filter(d => d.status === 'Claimed');
      
      setAvailableDonations(available);
      setClaimedDonations(claimed);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch donations. Please try again later.');
      setLoading(false);
      console.error(err);
    }
  };

  
const handleClaim = async (donationId) => {
    try {
        // Optimistically update the UI
        const donationToClaim = availableDonations.find(d => d.id === donationId);
        if (!donationToClaim) return;
        
        const updatedDonation = { ...donationToClaim, status: 'Claimed' };
        
        setAvailableDonations(prev => prev.filter(d => d.id !== donationId));
        setClaimedDonations(prev => [...prev, updatedDonation]);

        // API call to update the status in the database
        await api.patch(`/receiver/donations/${donationId}/claim/`);
        
        alert('Donation claimed successfully!');
    } catch (err) {
        console.error('Error claiming donation:', err.response || err);
        // Revert UI on error
        const revertedDonation = { ...donationToClaim, status: 'Available' };
        setClaimedDonations(prev => prev.filter(d => d.id !== donationId));
        setAvailableDonations(prev => [...prev, revertedDonation]);
        alert('Failed to claim donation. Please try again.');
    }
};

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="receiver-dashboard-container">
      {/* Header and other unchanged sections */}
      <header className="dashboard-header">
        <div className="header-left">
          <span className="logo">FoodShare</span>
          <nav>
            <a href="/" className="header-link">Home</a>
            <a href="/Overview" className="header-link">Overview</a>
          </nav>
        </div>
        <div className="header-right">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="dashboard-main">
        {/* Available Donations Section */}
        <section className="donations-list-section">
          <h3>Available Food Donations</h3>
          {loading && <p>Loading donations...</p>}
          {error && <p className="error-message">{error}</p>}
          {!loading && !error && availableDonations.length === 0 && (
            <p>No food donations are currently available.</p>
          )}
          <ul className="donations-list">
            {availableDonations.map(d => (
              <li key={d.id} className="donation-item">
                <div>
                  <strong>{d.title}</strong> ({d.meal_type}) - Quantity: {d.quantity}
                </div>
                <div className="donation-details">
                  <span>{d.description}</span>
                  <span>Pickup Location: {d.pickup_location}</span>
                  <span>Contact: {d.contact_number}</span>
                  <button onClick={() => handleClaim(d.id)} className="claim-btn">
                    Claim
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Claimed Donations Section */}
        <hr />
        <section className="donations-list-section">
          <h3>Claimed Donations</h3>
          {claimedDonations.length === 0 ? (
            <p>You have not claimed any donations yet.</p>
          ) : (
            <ul className="donations-list">
              {claimedDonations.map(d => (
                <li key={d.id} className="donation-item claimed">
                  <div>
                    <strong>{d.title}</strong> ({d.meal_type}) - Quantity: {d.quantity}
                  </div>
                  <div className="donation-details">
                    <span>{d.description}</span>
                    <span>Pickup Location: {d.pickup_location}</span>
                    <span>Contact: {d.contact_number}</span>
                    <span className="claimed-status">Status: Claimed</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default NGODashboard;