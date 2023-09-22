import { useState } from 'react';
import './home_page.css'
import headerIcon from './Profile.png'
import myPic from './wisher_header.png'
export default function HomeElement(){

    return(
    <div className='home-page'>
        <div className='planner-header'>
            <div className="yourplanner-header-pic-container">
                <img className='yourplanner-header-pic' src={myPic}></img>
            </div>
            <button className='planner-button'> Gacha Planner</button>
            <button className='banner-button'>Banner History</button>
            <button className='yourplanner-button'>Your Planner</button>
            <div className='yourplanner-user-profile-container'>
            <img className="yourplanner-user-profile" src={headerIcon} alt="Wisher" />
            </div>
                

            

        </div>
    </div>
    );
}
