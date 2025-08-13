import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Regis.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
    user_type: 'donor',
    contact_person: '',
    phone_number: '',
    organization_name: '',
    registration_number: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    if (formData.password !== formData.password2) {
      setErrors({ password2: "Passwords do not match" });
      setIsLoading(false);
      return;
    }

    try {
      const requestData = {
        email: formData.email,
        password: formData.password,
        user_type: formData.user_type
      };

      if (formData.user_type === 'donor') {
        requestData.donor = {
          contact_person: formData.contact_person,
          phone_number: formData.phone_number
        };
      } else if (formData.user_type === 'ngo') {
        requestData.ngo = {
          organization_name: formData.organization_name,
          registration_number: formData.registration_number
        };
      }

      const response = await axios.post('http://localhost:8000/api/register/', requestData);

      if (response.status === 201) {
        navigate('/login', { state: { registrationSuccess: true } });
      }
    } catch (error) {
      if (error.response?.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ non_field_errors: ['An error occurred during registration'] });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        {errors.non_field_errors && errors.non_field_errors.map((err, idx) => (
          <div key={idx} className="error-message">{err}</div>
        ))}

        <div className="form-group">
          <label>Email:</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} required />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input name="password" type="password" value={formData.password} onChange={handleChange} required />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label>Confirm Password:</label>
          <input name="password2" type="password" value={formData.password2} onChange={handleChange} required />
          {errors.password2 && <span className="error">{errors.password2}</span>}
        </div>

        <div className="form-group">
          <label>Register as:</label>
          <select name="user_type" value={formData.user_type} onChange={handleChange}>
            <option value="donor">Food Donor</option>
            <option value="ngo">NGO/Receiver</option>
          </select>
        </div>

        {formData.user_type === 'donor' && (
          <>
            <h3>Donor Information</h3>
            <div className="form-group">
              <label>Contact Person:</label>
              <input name="contact_person" type="text" value={formData.contact_person} onChange={handleChange} required />
              {errors.contact_person && <span className="error">{errors.contact_person}</span>}
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input name="phone_number" type="tel" value={formData.phone_number} onChange={handleChange} required />
              {errors.phone_number && <span className="error">{errors.phone_number}</span>}
            </div>
          </>
        )}

        {formData.user_type === 'ngo' && (
          <>
            <h3>NGO Information</h3>
            <div className="form-group">
              <label>Organization Name:</label>
              <input name="organization_name" type="text" value={formData.organization_name} onChange={handleChange} required />
              {errors.organization_name && <span className="error">{errors.organization_name}</span>}
            </div>
            <div className="form-group">
              <label>Registration Number:</label>
              <input name="registration_number" type="text" value={formData.registration_number} onChange={handleChange} required />
              {errors.registration_number && <span className="error">{errors.registration_number}</span>}
            </div>
          </>
        )}

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>

        <button type="button" className="login-redirect-btn" onClick={() => navigate('/login')}>
          I have an Account
        </button>
      </form>
    </div>
  );
};

export default Register;

