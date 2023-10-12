import { useState } from 'react';
import './inputPlanner.css'

function InputPlanner({ onClick }){
    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
    const [welkinShowForm, setwelkinShowForm] = useState(false);
    const [bpShowForm, setbpShowForm] = useState(false); 

    const [primogem, setPrimogem] = useState('');
    const [genesisCrystal, setGenesysCrystal] = useState('');
    const [interwinedFate, setInterwinedFate] = useState('');

    const planCheckboxChange = (checkboxValue) => {
        if (selectedCheckbox === checkboxValue) {
          // Uncheck the checkbox if it's already selected
          setSelectedCheckbox(null);
        } else {
          // Check the selected checkbox
          setSelectedCheckbox(checkboxValue);
        }
    };
    
    const handlSubmit = (e) => {
        e.preventDefault()
        const userInput = { primogem, genesisCrystal, interwinedFate, selectedCheckbox, welkinShowForm, bpShowForm}
        console.log(userInput)
    }
    const welkinCheckboxChange = () => {
    setwelkinShowForm(!welkinShowForm);
    };

    const bpCheckboxChange = () => {
    setbpShowForm(!bpShowForm);
    };

    return(
        <form className='gachaPlanner-form-container' onSubmit={handlSubmit}>
            <div className='gachaPlanner-header'>Gacha Planner</div>
            <div className="gachaPlanner-form-group">
                <label>How many Primogems you have?</label>
                <input 
                    type='number'
                    value={primogem}
                    onChange={(e) => setPrimogem(e.target.value)}
                    required
                />    
                <label>{primogem}</label>        
            </div>
            <div className="gachaPlanner-form-group">
                <label>How many Genesis crystals you have?:</label>
                <input 
                    value={genesisCrystal}
                    onChange={(e) => setGenesysCrystal(e.target.value)}
                    type='number'
                    required
                />             
            </div>
            <div className="gachaPlanner-form-group">
                <label>How many Interwined Fate you have</label>
                <input 
                    value={interwinedFate}
                    onChange={(e) => setInterwinedFate(e.target.value)}
                    type='number'
                    required/>
            </div>
            <div className="gachaPlanner-form-group">
                <label>Which patch do you planned to use your savings?</label>
                <select>
                    <option value="Fonta">mario</option>
                    <option value="Furina">yoshi</option>
                </select>
            </div>
            <div className="gachaPlanner-form-group">
                <label>Do you want to plan for 5 Star characters</label>
                <input 
                    type='checkbox' 
                    checked={selectedCheckbox === 'checkbox1'}
                    // value={'1'}
                    onChange={()=>planCheckboxChange("checkbox1")}/> First
                <input 
                    type='checkbox' 
                    // value={'2'}
                    checked={selectedCheckbox === 'checkbox2'}
                    onChange={()=>planCheckboxChange("checkbox2")}/> Second
            </div>
            {selectedCheckbox === 'checkbox1' && (
                <div className="gachaPlanner-form-group">
                    <label>Input for Checkbox 1:</label>
                    <input type="text"/>
                </div>
            )}
            {selectedCheckbox === 'checkbox2' && (
                <div className="gachaPlanner-form-group">
                    <label>Input for Checkbox 2:</label>
                    <input type="text"/>
                </div>
            )}
            <div className="gachaPlanner-form-group">
                <label>welkin Input Form</label>
                    <input
                        type="checkbox"
                        checked={welkinShowForm}
                        onChange={welkinCheckboxChange}/>
            </div>
            {welkinShowForm && (
                <div className="gachaPlanner-form-group">
                    <label>Input:</label>
                    <input type="text" />
                </div>
            )}
            {welkinShowForm && (
                <div className="gachaPlanner-form-group">
                    <label>Input:</label>
                    <input type="text" />
                </div>
            )}
            <div className="gachaPlanner-form-group">
                <label>bp Input Form</label>
                    <input
                        type="checkbox"
                        checked={bpShowForm}
                        onChange={bpCheckboxChange}/>
            </div>
            {bpShowForm && (
                <div className="gachaPlanner-form-group">
                    <label>Input:</label>
                    <input type="text" />
                </div>
            )}
            {bpShowForm && (
                <div className="gachaPlanner-form-group">
                    <label>Input:</label>
                    <input type="text"/>
                </div>
            )}
            <button 
                className='gachaPlanner-confirm-btn'
                type='submit'
                onClick={onClick}
                >Confirm
            </button>
        </form>
    )
};

export default InputPlanner;