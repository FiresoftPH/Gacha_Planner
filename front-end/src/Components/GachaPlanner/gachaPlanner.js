import { useState } from 'react';
import './gachaPlanner.css'
import Topbar from '../TopBarComponent/Topbar';
import ResultPlanner from '../ResultPlanner/resultPlanner'
import RankingBanner from '../RankingBanner/rankingBanner';

function GachaPlanner(){
    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
    const [welkinShowForm, setwelkinShowForm] = useState(false);
    const [bpShowForm, setbpShowForm] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const planCheckboxChange = (checkboxValue) => {
        if (selectedCheckbox === checkboxValue) {
          // Uncheck the checkbox if it's already selected
          setSelectedCheckbox(null);
        } else {
          // Check the selected checkbox
          setSelectedCheckbox(checkboxValue);
        }
    };

    const welkinCheckboxChange = () => {
    setwelkinShowForm(!welkinShowForm);
    };

    const bpCheckboxChange = () => {
    setbpShowForm(!bpShowForm);
    };

    const confirmClick = () => {
    setShowResult(true);
    };
    
    return(
    <div className='gachaPlanner-page'>
        <Topbar></Topbar>
        <div className='gachaPlanner-contents-container'>
            <div className='gachaPlanner-planner-container'>
                <form className='gachaPlanner-form-container'>
                    <div className='gachaPlanner-header'>Gacha Planner</div>
                    <div className="gachaPlanner-form-group">
                        <label>How many Primogems you have?</label>
                        <input 
                            type='number'
                            required
                        />            
                    </div>
                    <div className="gachaPlanner-form-group">
                        <label>How many Genesis crystals you have?:</label>
                        <input 
                            type='number'
                            required
                        />             
                    </div>
                    <div className="gachaPlanner-form-group">
                        <label>How many Interwined Fate you have</label>
                        <input 
                            type='number'
                            required/>
                    </div>
                    <div className="gachaPlanner-form-group">
                        <label>Which patch do you planned to use your savings?</label>
                        <select>
                            <option value="mario">mario</option>
                            <option value="yoshi">yoshi</option>
                        </select>
                    </div>
                    <div className="gachaPlanner-form-group">
                        <label>Do you want to plan for 5 Star characters</label>
                        <input 
                            type='checkbox' 
                            // value={first} 
                            checked={selectedCheckbox === 'checkbox1'}
                            onChange={()=>planCheckboxChange("checkbox1")}/> First
                        <input 
                            type='checkbox' 
                            // value={second}
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
                        onClick={confirmClick}
                        >Confirm
                    </button>
                    
                </form>
                {showResult && <ResultPlanner></ResultPlanner>}
            </div>
            <div className='characterRanking-container'>
                <RankingBanner></RankingBanner>
                <div className='keyword-description'>
                    <h1>Keyword</h1>
                    <ul>
                        <li>Pity count: guarantees that players will eventually obtain a 5-star character or weapon highlighted in the game.</li>
                        <li>Welkin (Blessing of the Welkin Moon): 30 day subscription offer in Genshin Impact. Upon buying the blessing, players will immediately obtain 300 Genesis Crystals and will continue to receive 90 Primogems every day they log in for the next 30 days.</li>
                        <li>BP (Battle Pass): This pass provides rewards at level thresholds for completing daily/weekly/BP period tasks, which each refresh after their respective periods.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    );
}

export default GachaPlanner;
