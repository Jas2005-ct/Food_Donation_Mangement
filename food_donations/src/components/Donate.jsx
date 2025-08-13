import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Donat.css';
import { 
  FaLeaf, 
  FaHandsHelping, 
  FaTruck, 
  FaChartLine, 
  FaRegRegistered
} from 'react-icons/fa';
const Donate = () => {
    const navigate = useNavigate();
  return (
    <div className="overview-container">
      <section className="mission-section">
        <h2>Our Mission</h2>
        <div className="mission-content">
          <div className="mission-text">
            <p>
              We aim to reduce food waste while fighting hunger by creating an efficient platform 
              that connects food donors (restaurants, caterers, events) with verified NGOs that 
              distribute food to underprivileged communities.
            </p>
            <ul>
              <li>Saved <strong>25,000+ meals</strong> from going to waste</li>
              <li>Partnered with <strong>50+ NGOs</strong> across the region</li>
              <li>Operational in <strong>15 cities</strong> and expanding</li>
            </ul>
          </div>
          <div className="mission-image">
            <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff" alt="Food donation" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            
            <div className="step-icon"><FaRegRegistered /></div>
            
            <h3>1. Register</h3>
            <p>Sign up as a Donor or NGO with basic details</p>
            </div>
          <div className="step">
            <div className="step-icon"><FaLeaf /></div>
            <h3>2. Post/Find Donations</h3>
            <p>Donors post available food, NGOs find nearby donations</p>
          </div>
          <div className="step">
            <div className="step-icon"><FaTruck /></div>
            <h3>3. Coordinate Pickup</h3>
            <p>Arrange logistics through our platform</p>
          </div>
          <div className="step">
            <div className="step-icon"><FaChartLine /></div>
            <h3>4. Track Impact</h3>
            <p>See analytics on your contributions</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>For Food Donors</h3>
            <ul>
              <li>Easy donation scheduling</li>
              <li>Tax deduction documentation</li>
              <li>Verified NGO network</li>
              <li>Real-time tracking</li>
            </ul>
          </div>
          <div className="service-card">
            <h3>For NGOs</h3>
            <ul>
              <li>Reliable food sources</li>
              <li>Quality assurance</li>
              <li>Logistics support</li>
              <li>Impact reporting</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Partners Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial">
            <p>"This platform helped us redirect 200kg of excess food from our wedding to homeless shelters."</p>
            <div className="author">- Priya M., Event Planner</div>
          </div>
          <div className="testimonial">
            <p>"We now receive regular donations through this system, ensuring we can feed 300 children daily."</p>
            <div className="author">- Ramesh K., NGO Director</div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to Make a Difference?</h2>
        <div className="cta-buttons">
          <button className="cta-button primary" onClick={() => navigate('/register')}>Register as Donor</button>
          <button className="cta-button secondary" onClick={() => navigate('/register')}>NGO Sign Up</button>
        </div>
      </section>
    </div>
  );
};

export default Donate;