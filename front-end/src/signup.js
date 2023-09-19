import React, { useState } from "react";
import "./signup.css"
import { useNavigate } from 'react-router-dom';

export default function SignupComp() {
  const navigate = useNavigate();

  const navigateToDestination = () => {
    navigate('/login');
  };  
  return(
    <div className="signup-page">
        <div className='form-container'>
        <SignUpForm></SignUpForm>
        </div> 
        <div className="signupform-section">
          <p className="signup-header-text">Wisher Planner</p>
          <p className="signup-welcome-text">New Here?</p>
          <button onClick={navigateToDestination} className="toLogin-page">Login</button>
        </div>
    </div>
    );
}



function SignUpForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the password and confirmPassword match
    if (formData.password === formData.confirmPassword) {
      // Passwords match, handle form submission (e.g., send data to server)
      console.log('Form Data:', formData);
    } else {
      // Passwords do not match, handle this scenario (e.g., show an error message)
      console.error('Passwords do not match');
    }
  };

  return (
    <div className="signup-form-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            placeholder="username"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            placeholder="password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button
            className="show-hide-password"
            type="button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? 'Hide' : 'Show'} Password
          </button>
        </div>
        <div className="form-group">
          <input
            placeholder="confirm password"
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Sign Up
        </button>
      </form>
    </div>
  );
}





