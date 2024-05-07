import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './login.css';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isPasswordChecked, setIsPasswordChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const onSuccessLogin = (jwtToken) => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 });
    history.replace('/');
  };

  const onSubmitFailure = (errorMsg) => {
    setErrorMsg(errorMsg);
    setShowSubmitError(true);
    setIsLoading(false); // Set loading to false on failure
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading to true while submitting
    const userDetails = { email, password };
    const apiUrl = 'https://aiback-itnw.onrender.com/login/';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();

      if (response.ok) {
        onSuccessLogin(data.jwtToken);
      } else {
        if (data && data.error_msg) {
          onSubmitFailure(data.error_msg);
        } else {
          onSubmitFailure('An unexpected error occurred');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      onSubmitFailure('An unexpected error occurred');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleCheckboxChange = () => {
    setIsPasswordChecked((prevState) => !prevState);
  };

  return (
    <div className="login-form-container">
      <form onSubmit={submitForm}>
        <h2 className='login-heading'>Spell Ai</h2>
        <div className="form-login-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            className='form-input-login'
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-login-group">
          <label htmlFor="password">Password:</label>
          <input
            type={isPasswordChecked ? 'text' : 'password'}
            className='form-input-login'
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            required
          />
          <div className="password-toggle">
            <input
              id="showPassword"
              type="checkbox"
              checked={isPasswordChecked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
        </div>
        <button className='login-button' type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'} {/* Show 'Loading...' text while submitting */}
        </button>
        {showSubmitError && <p className="error">{errorMsg}</p>}
        <p>
          Don't have an account?
          <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
