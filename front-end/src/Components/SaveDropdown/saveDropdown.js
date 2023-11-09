import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios'
import './saveDropdown.css';

function SaveDropdown(props) {
    axios.defaults.baseURL = 'http://localhost:5000'; // Replace with your API URL
    axios.defaults.withCredentials = true;
    const numberOfButtons = 5;
    const username = {
        "username": "furina"    
    }
    const [savePlannerList, setSavePlannerList] = useState(null);
    const [selectedButton, setSelectedButton] = useState(null);

    useEffect(() => {
        const fetchSaveList = async () => {
            try {
                const res = await axios.post('/api/planner/fetch-data', username);
                console.log('this is save');
                console.log(res.data);
            } catch (err) {
                console.error('Error: ', err);
            }
        };
        fetchSaveList();
    }, [])

    const handle_save = (event) => {
        const user_input = props.inputData;
        const program_output = props.calData;
        const load = {
            "username": "Hu Tao",
            "input": user_input,
            "output": program_output,
            "save_name": "save_name"
        }
        axios.post('/api/planner/save-data', load)
        .then(response => console.log(response))
        .catch(err => console.error('Error: ', err))
    }
    const saveClick = (index) => {
        setSelectedButton(index === selectedButton ? null : index);
        console.log(index);
    };

    return props.trigger ? (
        <div className='overlay'>
            <div className='saved-list'>
                {Array.from({ length: numberOfButtons }, (_, index) => (
                    <button
                        key={index} 
                        className={`save-list-button ${index === selectedButton ? 'active' : 'inactive'}`}
                        onClick={() => saveClick(index)}
                    >furina
                    </button>
                ))}
            </div>
            <div className='button-conatiner'>
                <button className='btn' onClick={handle_save}>Save</button>
                <button className='btn'>Cancel</button>
            </div>
        </div>
    ) : '';
}

export default SaveDropdown;
