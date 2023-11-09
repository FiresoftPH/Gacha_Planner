import React, { useState,useEffect } from "react";
import './SignUpForm.css'
import axios from 'axios'; // Import Axios
export default function SignUpForm() {
    const [formData, setFormData] = useState({
      name: '',
      username: '',
      password: '',
      
    });
  
    const [showPassword, setShowPassword] = useState(false);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
    const [username, setUsername] = useState(0);
    const [password, setPassword] = useState(0);

  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      setUsername(formData.username);
      setPassword(formData.password)
      const userInput = {
         
        name:'LLOR',
        username: ':L',
        password: '1234',
      };
      console.log(userInput);
      try {
          const response = await axios.post('/api/auth/signup', userInput);
          const post_msg = response.data;
          console.log(post_msg)
      } catch (err) {
          console.error('Error: ', err);
      }
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

          <button onClick={handleSubmit} type="submit" className="submit-button">
            Sign Up
          </button>
        </form>
      </div>
    );
  }