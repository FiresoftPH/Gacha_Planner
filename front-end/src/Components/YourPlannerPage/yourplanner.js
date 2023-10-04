import { useState } from 'react';
import './yourplanner.css'

import pic1 from '../../Pictures/progresspic1.png'
import pic2 from '../../Pictures/progresspic2.png'
import pic3 from '../../Pictures/progresspic3.png'
import Topbar from '../TopBarComponent/Topbar';

export default function HomeElement(){
    const [primogems, setPrimogems] = useState('');
    const [Genesis, setGenesis] = useState('');
    const [Interwined, setInterwined] = useState('');



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
        <Topbar></Topbar>

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
