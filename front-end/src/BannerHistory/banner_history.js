import { useState } from 'react';
import './banner_history.css'
import headerIcon from './Profile.png'
import myPic from './wisher_header.png'
import { useNavigate } from 'react-router-dom';

export default function BannerHistory(){
    const navigate = useNavigate();

    const navigateToDestination = () => {
        navigate('/yourplanner');
      };  
    const HorizontalScrollGrid = () => {
    return (
        <div className="horizontal-scrolling-box">
        <div className="content">
          {/* Your content goes here */}
          <div className="item">Item 1</div>
          <div className="item">Item 2</div>
          <div className="item">Item 3</div>
          {/* Add more content as needed */}
        </div>
      </div>
    );
    };



    return(
    <div className='banner-page'>
        <div className='banner-header'>
            <div className="banner-header-pic-container">
                <img className='banner-header-pic' src={myPic}></img>
            </div>
            <button className='planner-button'> Gacha Planner</button>
            <button className='banner-button'>Banner History</button>
            <button onClick={navigateToDestination} className='yourplanner-button'>Your Planner</button>
            <div className='banner-user-profile-container'>
            <img className="banner-user-profile" src={headerIcon} alt="Wisher" />
            </div>
        </div>

        <div className='banner-body'>
            <div className='banner-timeline'>
                <div className='banner-body-header'>
                    <p className='banner-body-header-text'>Timeline Banner History</p>
                    <HorizontalScrollGrid></HorizontalScrollGrid>

                    
                </div>
            </div>
            <div className='banner-characters-section'>
                <div className='character-list'>character list</div>
                <div className='character-info'>character info</div>
                
            </div>
        </div>
    
    </div>
    );
}
