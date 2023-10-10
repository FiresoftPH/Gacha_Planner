import React, { useState } from "react";
import "./LoginForm.css"
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
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form data submitted:", formData);
      // You can add your authentication logic here
    };
  
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
          </div>
        
        </form>
      </div>
    );
  }
  