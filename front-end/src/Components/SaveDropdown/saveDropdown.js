import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios'
import './saveDropdown.css';
import deleteIcon from '../../Pictures/deleteIcon.png'

function SaveDropdown(props) {
    axios.defaults.baseURL = 'http://localhost:5000/api'; // Replace with your API URL
    axios.defaults.withCredentials = true;
    const numberOfButtons = 5;
    const username = {
        "username": "hutao"    
    }
    const [savePlannerList, setSavePlannerList] = useState([]);
    const [selectedButton, setSelectedButton] = useState(null);
    const [selectedBtnName, setSeletedBtnName] = useState(null);
    const [saveName, setSaveName] = useState('');
    const [addSaveName, setAddSaveName] = useState('');

    // Move fetchSaveList inside the component as an asynchronous function
    const fetchSaveList = async () => {
        try {
            const res = await axios.post('/user/fetch-data', username);

            if (Array.isArray(res.data)) {
                setSavePlannerList(res.data);
                console.log('Data has been fetched:', res.data);
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

    useEffect(() => {
        // Watch for changes in currPlanName
        console.log('CurrPlanName has changed:', props.currPlanName);
      }, [props.currPlanName]);

    const handle_save = (event) => {
        const user_input = props.inputData;
        const program_output = props.calData;
        const load = {
            "username": "hutao",
            "input": user_input,
            "output": program_output,
            "save_name": saveName
        }
        axios.post('/planner/save-data', load)
        .then(response => console.log(response))
        .catch(err => console.error('Error: ', err))
        // setLocalTrigger(!localTrigger);
        props.saveClickFunc();
        // console.log('setfalse', localTrigger);
    }

    const handle_delete = async (name) => {
        const del = {
            "username": "hutao",
            "save_name": name
        };

        try {
            await axios.post('/user/delete-data', del);
            await fetchSaveList();  // Assuming fetchSaveList is an asynchronous function
            console.log('Data has been deleted successfully.');
        } catch (err) {
            console.error('Error deleting data: ', err);
        }
    }
 
    const saveClick = (index, name) => {
        // setSelectedButton(index === selectedButton ? null : index);
        setSelectedButton(index);
        setSeletedBtnName(name);
        console.log(selectedButton);
        {name && props.planName(name)};
    };

    const addingSaveName = (event) => {
        setAddSaveName(event);
        setSaveName(event);
    }

    return (
        <div className='overlay'>
            <div className='saved-list'>
                {(savePlannerList.length > 0 || Array.isArray(savePlannerList)) && (savePlannerList.map((item, index) => (
                    <div className='save-container'>
                        <button
                            key={index} 
                            className={`save-list-button ${index === selectedButton && item[0] ===selectedBtnName ? 'active' : 'inactive'}`}
                            onClick={() => saveClick(index, item[0])}
                        >{item[0]}
                        </button>
                        <button className='delete-icon' onClick={() => handle_delete(item[0])}>
                            <img src={deleteIcon}/>
                        </button>
                        
                    </div>
                )))}
                {/* {savePlannerList.length + 1 <= 5 && (
                    <div className='save-container'>
                        <button
                            className={`save-list-button ${savePlannerList.length + 1 === selectedButton ? 'active' : 'inactive'}`}
                            onClick={() => saveClick(savePlannerList.length + 1, null)}>
                            {savePlannerList.length + 1 === selectedButton ? (
                                <input 
                                    type='text' 
                                    value={addSaveName}   
                                    onChange={(e) => addingSaveName(e.target.value)}/>
                                    ) : (addSaveName !== '' ? addSaveName : '+')}
                        </button>
                    </div>)} */}
                {savePlannerList.length === 0 && (
                <div className='save-container'>
                    empty
                </div>)}
            </div>
        </div>
    );
}

export default SaveDropdown;
