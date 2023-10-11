import { useState } from 'react';
import './yourplanner.css'

import Topbar from '../../Components/TopBarComponent/Topbar';
import ProgressTracking from '../../Components/ProgressTrack/ProgressTracking';

export default function YourPlanner(){
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
    <div className='yourplanner-page-container'>
        <Topbar></Topbar>
        <div className='yourplanner-body'>
            <ProgressTracking primo={primogems} genesis={Genesis} interwined={Interwined} handlePrimosChange={handlePrimosChange} handleGenesisChange={handleGenesisChange} handleInterwinedChange={handleInterwinedChange} handleSubmit={handleSubmit}></ProgressTracking>
        </div>
    </div>
    );
}

