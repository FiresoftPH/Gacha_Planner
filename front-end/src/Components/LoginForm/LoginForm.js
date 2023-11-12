import React, { useState,useEffect } from "react";
import "./LoginForm.css"
import axios from '../../axiosConfig'; // Import Axios
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const [formData, setFormData] = useState({
      username: "",
      password: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
    const [post, setPost] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();

      const userInput = {
        username: formData.username,
        password: formData.password,
      };
      console.log(userInput);
      try {
          const response = await axios.post('/auth/users', userInput);
          const post_msg = response.data;
          console.log(post_msg)
                    if (response.data.error) {
            // If there's an error, update the state with the error message
            setErrorMessage(response.data.error);
          } else {
            // If successful login, you can handle it accordingly

            localStorage.setItem('username', formData.username); //caching
            localStorage.setItem('password', formData.password); //caching
            
            console.log(response.data.message);
            console.log('login SUCCEss')
            navigate('/');
          }
      } catch (err) {
          console.error('Error: ', err);
      }
  }
 
  
    return (
      <div className="login-form">
        <h2 className="form-header">Log in to Wisher Planner</h2>
        <form onSubmit={handleSubmit}>
          <div className="loginform-group">
            <input
              className="login-username-input"
              placeholder="username"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="loginform-group">
          
            <input
              className="login-password-input"
              placeholder="password"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button className="log-in-button" type="submit">Login</button>
            <div>{errorMessage}</div>
          </div>
        
        </form>
      </div>
    );
  }
  