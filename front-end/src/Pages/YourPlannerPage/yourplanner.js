import { useState,useEffect } from 'react';
import './yourplanner.css'
import axios from '../../axiosConfig'
import ResultPlanner from '../../Components/ResultPlanner/resultPlanner';
import Topbar from '../../Components/TopBarComponent/Topbar';
import ProgressTracking from '../../Components/ProgressTrack/ProgressTracking';
import ErrorMessage from './errorMessage';

export default function YourPlanner(){
    const [primogems, setPrimogems] = useState('0');
    const [Genesis, setGenesis] = useState('0');
    const [Interwined, setInterwined] = useState('0');
    const [savePlannerList, setSavePlannerList] = useState([]);
    const username = localStorage.getItem('username'); //Get data from cach
    const jsonUsername = {username: username,};
    const [fetchTrigger, setFetchTrigger] = useState(false);

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

  const fetchSaveList = async () => {
    try {
        const res = await axios.post('/user/fetch-data', jsonUsername);

        if (Array.isArray(res.data)) {
            setSavePlannerList(res.data);
            console.log('Data has been fetched: yayyyyy', res.data[0][1].input.crystals);
        } else {
            console.log('Error: Received non-array data:', res.data);
            setSavePlannerList([]); // Set an empty array in case of an error
        }
    } catch (err) {
        console.error('Error fetching data: ', err);
        console.log('error here arai');
        setSavePlannerList([]); // Set an empty array in case of an error
    }
    
};

  useEffect(() => { fetchSaveList();
  }, [])
  
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
    
    // const handleSubmit  = async (e) =>{
      
    //     // Handle the form submission, e.g., send data to a server or perform an action
    //     console.log(`Primogems: ${primogems}, GenesisCrystals: ${Genesis},InterwinedCrystals: ${Interwined}`);
    //   try {
    //     const response = await axios.post('/user/fetch-data', jsonUsername);
    //     // console.log(jsonUsername)
    //     // const post_msg = response.data;
    //     // console.log(post_msg)
    //     const updatedSavePlannerList = savePlannerList.map(item => {
    //       const newItem = { ...item };
    //       newItem[1].input = 100;
    //       return newItem;
    //     });

    //     if (response.data.error) {
    //       // If there's an error, update the state with the error message
    //       setErrorMessage(response.data.error);

    //     } else {
    //       // If successful login, you can handle it accordingly
    //       console.log(response.data.message);
    //     }
    // } catch (err) {
    //     console.error('Error: ', err);
    // }};

    const handleSetInput = () => {
      // Create a new array with modified values
      const updatedSavePlannerList = savePlannerList.map(item => {
        // Clone the item to avoid modifying the original object
        const newItem = { ...item };
        // Update the input property to 100
        newItem[1].input.primogems = parseInt(primogems);
        newItem[1].input.crystals = parseInt(Genesis);
        newItem[1].input.fates = parseInt(Interwined);
        return newItem;
      });
      setFetchTrigger((prev) => !prev);
      // Update the state with the new array
      setSavePlannerList(updatedSavePlannerList);
    };

    return(
    <div className='yourplanner-page-container'>
        <Topbar></Topbar>
        <div className='yourplanner-body'>
            <ProgressTracking primo={primogems} genesis={Genesis} interwined={Interwined} handlePrimosChange={handlePrimosChange} handleGenesisChange={handleGenesisChange} handleInterwinedChange={handleInterwinedChange} handleSubmit={handleSetInput}></ProgressTracking>
            {errorMessage !== "" && (
                    <ErrorMessage></ErrorMessage>
                )}
            {savePlannerList.length > 0 ? (savePlannerList.map((item, index) => (<ResultPlanner key={index} fetchTrigger={fetchTrigger} userInputData={item[1].input} userResultData={item[1].output} isTracking={true} planName={item[0]} username={username}></ResultPlanner>))
            ) : (
              <ErrorMessage></ErrorMessage>
            )}
        </div>
    </div>
    );
}
