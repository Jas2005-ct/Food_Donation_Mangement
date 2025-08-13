import React, { useState, useEffect } from 'react';
import './Overview.css';

import image1 from '../assets/food_donation_1.jpg';
import image2 from '../assets/food_donation_2.jpg';
import image3 from '../assets/food_donation_3.jpg';
import image4 from '../assets/food_donation_4.jpg';
import image5 from '../assets/food_donation_5.jpg';

function Overview() {
  const [loading, setLoading] = useState(true);
  
  // Array of imported images
  const images = [image1, image2, image3, image4, image5];

  // Simulate a loading delay for demonstration purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 second loading time
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="overview-container">
      {/* Header */}
      <header className="overview-header">
        <div className="header-left">
          <span className="logo">FoodShare</span>
          <nav>
            <a href="/" className="header-link">Home</a>
            <a href="/overview" className="header-link active">Overview</a>
          </nav>
        </div>
        <div className="header-right">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="overview-main">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading overview...</p>
          </div>
        ) : (
          <>
            <section className="overview-text">
              <h1>Welcome to FoodShare</h1>
              <p>
                FoodShare is a platform dedicated to connecting donors of surplus food with organizations that can distribute it to those in need. Our mission is to reduce food waste and combat hunger by creating a seamless, efficient, and transparent food donation process.
              </p>
              <p>
                Donors can easily list food items, including details like meal type, quantity, and pickup location. NGOs and other receiving organizations can view a real-time list of available donations and claim them with a simple click. This ensures that fresh, nutritious food reaches communities quickly and safely.
              </p>
              <p>
                Join us in building a more sustainable and compassionate community, one meal at a time.
              </p>
            </section>

            <section className="image-gallery">
              {images.map((img, index) => (
                <div key={index} className="image-card">
                  <img src={img} alt={`Food Donation ${index + 1}`} />
                </div>
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Overview;