import { useState } from 'react';
import './home_page.css'
import headerIcon from './Profile.png'
import myPic from './wisher_header.png'
import pic1 from './progresspic1.png'
import pic2 from './progresspic2.png'
import pic3 from './progresspic3.png'
import { useNavigate } from 'react-router-dom';

export default function HomeElement(){
    const navigate = useNavigate();
    const [primogems, setPrimogems] = useState('');
    const [Genesis, setGenesis] = useState('');
    const [Interwined, setInterwined] = useState('');

    const navigateToDestination = () => {
        navigate('/bannerhistory');
      };  

    const handleSubmit = () => {
        // Handle the form submission, e.g., send data to a server or perform an action
        console.log(`Primogems: ${primogems}, GenesisCrystals: ${Genesis},InterwinedCrystals: ${Interwined}`);
      };


      const handlePrimosChange = (event) => {
        setPrimogems(event.target.value);
      };
    
      const handleGenesisChange = (event) => {
        setGenesis(event.target.value);
      };

      const handleInterwinedChange = (event) => {
        setInterwined(event.target.value);
      };

    return(
    <div className='home-page'>
        <div className='planner-header'>
            <div className="yourplanner-header-pic-container">
                <img className='yourplanner-header-pic' src={myPic}></img>
            </div>
            <button className='planner-button'> Gacha Planner</button>
            <button onClick={navigateToDestination} className='banner-button'>Banner History</button>
            <button className='yourplanner-button'>Your Planner</button>
            <div className='yourplanner-user-profile-container'>
            <img className="yourplanner-user-profile" src={headerIcon} alt="Wisher" />
            </div>
        </div>

        <div className='yourplanner-body'>
            <div className='yourplanner-progress-tracking'>
                <div className='yourplanner-body-header'>
                    <p className='yourplanner-body-header-text'>Progress Tracking</p>
                </div>
                <div className='yourplanner-body-input'>
                    <div className='yourplanner-input-container'>
                        <img className='yourplanner-pic' src={pic1}></img>
                        <p className='yourplanner-input-text'>How many primogem you have?</p>
                        <input
                            className='planner-input-boxes'
                            type="text"
                            id="primogems"
                            value={primogems}
                            onChange={handlePrimosChange}
                        />
                    </div>
                    
                    <div className='yourplanner-input-container' >
                    <img className='yourplanner-pic' src={pic2}></img>
                    <p className='yourplanner-input-text'>How many Genesis crystals you have?</p>
                    <input
                            className='planner-input-boxes'
                            type="text"
                            id="Genesis"
                            value={Genesis}
                            onChange={handleGenesisChange}
                        />
                    </div>
                    
                    <div className='yourplanner-input-container'>
                    <img className='yourplanner-pic' src={pic3}></img>
                    <p className='yourplanner-input-text'>How many Interwined crystals you have?</p>
                    <input
                            className='planner-input-boxes'
                            type="text"
                            id="Interwined"
                            value={Interwined}
                            onChange={handleInterwinedChange}
                        />
                    </div>
                    
                    <button className='planner-progress-button' onClick={handleSubmit}>Confirm</button>
                </div>
            </div>
            <div className='Focalors-plan'>
                lol
            </div>
        </div>
    </div>
    );
}
