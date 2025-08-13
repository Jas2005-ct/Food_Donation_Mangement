import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Logins.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const registrationSuccess = location.state?.registrationSuccess;

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const response = await axios.post('http://localhost:8000/api/login/', {
      email,
      password,
    });
    console.log(response.data); 

    const { access, refresh, user_type, email: returnedEmail } = response.data;

    // Store tokens and user info
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    localStorage.setItem('user_type', user_type);
    localStorage.setItem('email', returnedEmail);

    // Navigate based on user_type
    if (user_type === 'donor') {
      navigate('/donor-dashboard');  // route for donor dashboard
    } else if (user_type === 'ngo') {
      navigate('/ngo-dashboard');    // route for NGO dashboard
    } else {
      setError('Unknown user type');
    }
  } catch (err) {
    setError('Invalid email or password');
  }
};


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {registrationSuccess && (
          <div className="success-message">
            Registration successful! Please login.
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
