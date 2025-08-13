import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <h1 className="app-title">Food Donation</h1>
      <nav className="app-nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/donate" className="nav-link">Donate Now</Link>
        <Link to="/register" className="nav-link">Register</Link>
        <Link to="/login" className="nav-link">Login</Link>
      </nav>
    </header>
  );
};

export default Header;