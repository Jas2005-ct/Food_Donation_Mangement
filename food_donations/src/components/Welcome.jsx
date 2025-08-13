import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';
//import images from './assets';

const foodImages = [
  "https://images.unsplash.com/photo-1509440159596-0249088772ff",
  "https://images.unsplash.com/photo-1543351611-58f69d7c1781",
  "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81",
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f",
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  "https://images.unsplash.com/photo-1432139509613-5c4255815697",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
  
];

function Welcome() {
  const [currentImage, setCurrentImage] = useState(foodImages[0]);

  const getRandomImage = () => {
    const currentIndex = foodImages.indexOf(currentImage);
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * foodImages.length);
    } while (randomIndex === currentIndex && foodImages.length > 1);
    return foodImages[randomIndex];
  };

  const handleImageClick = () => {
    setCurrentImage(getRandomImage());
  };

  return (
    <div className="page-container">
      <main className="section">
        <div className="content">
          <h2 className="title">Welcome to Food Distribution!</h2>
          <p className="subtitle">Connecting surplus food with those in need</p>
          <div className="action-buttons">
            <Link to="/register" className="btn btn-primary">Join as Donor</Link>
            <Link to="/register" className="btn btn-secondary">Join as Volunteer</Link>
            <Link to="/login" className="btn btn-outline">Login</Link>
          </div>
        </div>
      </main>
      <div className="mission-image">
        <img 
          src={currentImage} 
          alt="Food donation" 
          className="hero-image clickable-image"
          onClick={handleImageClick}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = foodImages[0];
          }}
        />
        <div className="image-caption">
          <p>Click the image to see more of our work</p>
        </div>
      </div>
    </div>
  ); 
}

export default Welcome;
