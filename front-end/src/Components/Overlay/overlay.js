import React from 'react'
import './overlay.css'

function Overlay(props) {
    return (props.trigger) ? (
        <div className='overlay'>
            <div className='saved-list'>
                {/* { props.children } */}
                <button className='saved-list-group'>furina</button>
            </div>
            <button className='save-btn'>Save</button>
        </div>
    ) : '';
}

export default Overlay
