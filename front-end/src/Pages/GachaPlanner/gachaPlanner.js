import { useState } from 'react';
import React from 'react';
import './gachaPlanner.css'
import Topbar from '../../Components/TopBarComponent/Topbar';
import ResultPlanner from '../../Components/ResultPlanner/resultPlanner';
import RankingBanner from '../../Components/RankingBanner/rankingBanner';
import InputPlanner from '../../Components/InputPlanner/inputPlanner';

function GachaPlanner() {
    const [showResultCompo, setShowResultCompo] = useState(false); 
    const [userInput, setUserInput] = useState(null); 
    const [userResult, setUserResult] = useState(null); 
    
    const handleUserInput = (data) => {
        setUserInput(data);
    };
    const handleUserResult = (data) => {
        setUserResult(data);
    };

    const handleConfirmClick = () => {
        setShowResultCompo(true);
    };

    return (
        <div className='gachaPlanner-page'>
            <Topbar></Topbar>
            <div className='gachaPlanner-contents-container'>
                <div className='gachaPlanner-planner-container'>
                    <InputPlanner onClick={handleConfirmClick} onUserInput={handleUserInput} onUserResult={handleUserResult}></InputPlanner>
                    {showResultCompo && userInput != null && userResult != null &&<ResultPlanner userInputData={userInput} userResultData={userResult}></ResultPlanner>}
                    {/* {!showResultCompo && userInput != null && userResult != null &&<ResultPlanner userInputData={userInput} userResultData={userResult}></ResultPlanner>} */}
                </div>
                <div className='characterRanking-container'>
                    <RankingBanner></RankingBanner>
                    <div className='keyword-container'>
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
