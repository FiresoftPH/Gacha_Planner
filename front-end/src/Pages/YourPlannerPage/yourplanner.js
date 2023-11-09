import { useState,useEffect } from 'react';
import './yourplanner.css'
import axios from 'axios'


import Topbar from '../../Components/TopBarComponent/Topbar';
import ProgressTracking from '../../Components/ProgressTrack/ProgressTracking';

export default function YourPlanner(){
    const [primogems, setPrimogems] = useState('');
    const [Genesis, setGenesis] = useState('');
    const [Interwined, setInterwined] = useState('');

    useEffect(() => {
      // Perform the GET request when the component is mounted
      axios.get('/api/planner/fetch-data')
        .then(response => {
          // Handle the response
          console.log('URPLANNERRRRR')
          console.log(response.data);
        })
        .catch(error => {
          // Handle errors
          console.log('ERR')
          console.log(error);
        });
    }, []); 

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

