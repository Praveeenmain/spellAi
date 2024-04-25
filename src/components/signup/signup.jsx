import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Importing CSS file

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true); // Show loader while processing

    try {
      const response = await axios.post('https://aiback-itnw.onrender.com/signup/', formData);
      console.log('Response:', response.data);

      // Clear form fields
      setFormData({
        name: '',
        email: '',
        password: ''
      });

      setResponseMessage('Signup successful!');
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Signup failed. Please try again.');
    } finally {
      setIsLoading(false); // Hide loader after processing
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-heading">Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
        {responseMessage && <p className="response-message">{responseMessage}</p>}
      </form>
      <p className="login-link">Already have an account? <a href="/login">Log in</a></p>
    </div>
  );
}

export default Signup;
