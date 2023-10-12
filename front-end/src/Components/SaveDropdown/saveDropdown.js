import { useState } from 'react';
import React from 'react';
import './saveDropdown.css';

function SaveDropdown(props) {
    const numberOfButtons = 3;
    const [selectedButton, setSelectedButton] = useState(null);

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
                <button className='btn'>Save</button>
                <button className='btn'>Cancel</button>
            </div>
        </div>
    ) : '';
}

export default SaveDropdown;
