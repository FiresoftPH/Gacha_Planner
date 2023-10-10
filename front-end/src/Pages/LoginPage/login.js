import React, { useState } from "react";
import "./login.css"
import { useNavigate } from 'react-router-dom';
import myImage from '../../Pictures/wisher_header.png';
import LoginForm from '../../Components/LoginForm/LoginForm'
export default function LoginComp() {
  
  const navigate = useNavigate();

  const navigateToDestination = () => {
    navigate('/signup');
  };
    return(
    <div className="login-page">
        <div className='loginform-container'>
        <LoginForm></LoginForm>
        </div>


        <div className='loginform-section2'>
          <h2 className="login-header-text">
            <img className="login-header-image" src={myImage} alt="Wisher" />
          </h2>
          <div className='test-login'>
            <p className="login-welcome-text">Welcome back</p>
            <div>
            <button onClick={navigateToDestination} className="toSignup-page">Sign up</button>
            </div>

          </div>
        </div>
        

    </div>
    );
}

