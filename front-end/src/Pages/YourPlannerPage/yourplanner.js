import { useState,useEffect } from 'react';
import './yourplanner.css'
import axios from 'axios'

import ResultPlanner from '../../Components/ResultPlanner/resultPlanner';
import Topbar from '../../Components/TopBarComponent/Topbar';
import ProgressTracking from '../../Components/ProgressTrack/ProgressTracking';
import ErrorMessage from './errorMessage';

export default function YourPlanner(){
    const [primogems, setPrimogems] = useState('');
    const [Genesis, setGenesis] = useState('');
    const [Interwined, setInterwined] = useState('');
    

  //   const userName = {
  //     username: 'most',
  //   };

  //   useEffect(() => {
  //     // Perform the GET request when the component is mounted
  //     axios.post('/api/user/fetch-data',userName)
  //       .then(response => {
  //         // Handle the response
  //         console.log('URPLANNERRRRR')
  //         console.log(response.data);
  //       })
  //       .catch(error => {
  //         // Handle errors
  //         console.log('ERR')
  //         console.log(error);
  //       });
  //   }, []); 

  // }
  const handlePrimosChange = (event) => {
    setPrimogems(event.target.value);
  };

  const handleGenesisChange = (event) => {
    setGenesis(event.target.value);
  };

  const handleInterwinedChange = (event) => {
    setInterwined(event.target.value);
  };

    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit  = async (e) =>{
      
        // Handle the form submission, e.g., send data to a server or perform an action
        console.log(`Primogems: ${primogems}, GenesisCrystals: ${Genesis},InterwinedCrystals: ${Interwined}`);
      
      const userName = {
        username: 'Bob',
      };
      try {
        const response = await axios.post('/api/user/fetch-data', userName);
        const post_msg = response.data;
        console.log(post_msg)
        if (response.data.error) {
          // If there's an error, update the state with the error message
          setErrorMessage(response.data.error);

        } else {
          // If successful login, you can handle it accordingly
          console.log(response.data.message);
        }
    } catch (err) {
        console.error('Error: ', err);
    }};

    return(
    <div className='yourplanner-page-container'>
        <Topbar></Topbar>
        <div className='yourplanner-body'>
            <ProgressTracking primo={primogems} genesis={Genesis} interwined={Interwined} handlePrimosChange={handlePrimosChange} handleGenesisChange={handleGenesisChange} handleInterwinedChange={handleInterwinedChange} handleSubmit={handleSubmit}></ProgressTracking>
            {errorMessage !== "" && (
                    <ErrorMessage></ErrorMessage>
                )}
            
        </div>
        
          
        
    </div>
    );
}

