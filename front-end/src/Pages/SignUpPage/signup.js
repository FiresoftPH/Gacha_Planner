import React, { useState, useEffect } from "react";
import "./signup.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import myImage from '../../Pictures/wisher_header.png';
import SignUpForm from '../../Components/SignUpForm/SignUpForm';


export default function SignupComp() {
  const navigate = useNavigate();

  const navigateToDestination = () => {
    navigate('/login');
  };


  return (
    <div className="signup-page">
      <div className='form-container'>
        <SignUpForm/>
      </div> 

      <div className="signupform-section">
        <h2 className="signup-header-text">
          <img className="login-header-image" src={myImage} alt="Wisher" />
        </h2>
        <form className='test-login'>
          <p className="signup-welcome-text">New Here?</p>
          <div>
            <button onClick={navigateToDestination} className="toLogin-page">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
