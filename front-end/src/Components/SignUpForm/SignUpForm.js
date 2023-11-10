import React, { useState,useEffect } from "react";
import './SignUpForm.css'
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';
export default function SignUpForm() {
    const [formData, setFormData] = useState({
      name: '',
      username: '',
      password: '',
      confirm_password:'',
      
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
    
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.name || !formData.username || !formData.password) {
        setErrorMessage('Please fill in all the fields');
        return;
      }
      if (formData.password !== formData.confirm_password) {
        setErrorMessage('Make sure confirm password is the same as password');
      }
      if (formData.password === formData.confirm_password) {
      const userInput = {
         
        name:formData.name,
        username: formData.username,
        password: formData.password,
      };
      console.log(userInput);
      try {
          const response = await axios.post('/api/auth/signup', userInput);
          const post_msg = response.data;
          console.log(post_msg)
          if (response.data.error) {
            // If there's an error, update the state with the error message
            setErrorMessage(response.data.error);
          } else {
            // If successful login, you can handle it accordingly
            console.log(response.data.message);
            console.log('signup SUCCEss')
            navigate('/');
          }
      } catch (err) {
          console.error('Error: ', err);
      }}
  }
    
    return (
      <div className="signup-form-container">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <input
              className="signup-input"
              placeholder="Name"
              type='text'
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              className="signup-input"
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
              className="signup-input"
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
              className="signup-input"
              placeholder="confirm password"
              type={showPassword ? 'text' : 'password'}
              id="confirm-password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button onClick={handleSubmit} type="submit" className="submit-button">
            Sign Up
          </button>
          <div>{errorMessage}</div>
        </form>
      </div>
    );
  }