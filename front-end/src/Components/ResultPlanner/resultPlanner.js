import { useNavigate, useState } from 'react';
import './resultPlanner.css'
import targetPic from '../../Pictures/targetSymbol.png'
import primogmPic from '../../Pictures/primogemSymbol.png'
import genesisPic from '../../Pictures/genesiscrystalSymbol.png'
import Overlay  from '../Overlay/overlay';

function ResultPlanner(){
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [showSaveList, setShowSaveList] = useState(false);

    const suggestionClick = () => {
        setShowSuggestion(!showSuggestion);
    };
    
    const saveClick = () => {
        setShowSaveList(!showSaveList);
        console.log("yay");
    };

    return(
    <div className='gachaPlanner-result-container'>
        <button 
            className='save-button'
            onClick={saveClick}
            >Current Plan
        </button> 
        <Overlay trigger={showSaveList}>
        </Overlay>
        <div className='symbol-container'>
            <div className='info'>
                <div className="circle-container">
                    <img src={targetPic}></img>
                </div>
                <div className='symbol-name'>Target Patch</div>
                <div className='symbol-info'>4.0</div>
                <div className='symbol-info'>First half</div>
            </div>
            <div className='info'>
                <div className="circle-container">
                    <img src={primogmPic}></img>        
                </div>
                <div className='symbol-name'>Target Patch</div>
                <div className='symbol-info'>4.0</div>
                <div className='symbol-info'>First half</div>
            </div>
            <div className='info'>
                <div className="circle-container">
                    <img src={genesisPic}></img>
                </div>
                <div className='symbol-name'>Target Patch</div>
                <div className='symbol-info'>4.0</div>
                <div className='symbol-info'>First half</div>
            </div>
        </div>
        <div className='informationText'>
            <ul>
                <li>hi</li>
            </ul>
        </div>
        <button 
            className={`suggestion-button ${showSuggestion ? 'active' : 'inactive'}`} 
            onClick={suggestionClick}>
            {showSuggestion ? 'Hide Component' : 'Show Component'}
        </button>
            {showSuggestion && <div className='informationText'>suggestion</div>}    
    </div>
    )
};

export default ResultPlanner;