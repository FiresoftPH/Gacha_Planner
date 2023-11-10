import { useState } from 'react';
import './resultPlanner.css'
import targetPic from '../../Pictures/targetSymbol.png'
import primogmPic from '../../Pictures/primogemSymbol.png'
import genesisPic from '../../Pictures/genesiscrystalSymbol.png'
import SaveDropdown from '../SaveDropdown/saveDropdown.js'
import charIcon from '../../Pictures/charIcon.png'
import saveIcon from '../../Pictures/saveIcon.png'
import arrow from '../../Pictures/arrow.png'

function ResultPlanner( props ){
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [showSaveList, setShowSaveList] = useState(false);

    const [currPlanName, setCurrPlanName]= useState("Current plan")
    const inputData = props.userInputData;
    const calData = props.userResultData;
    console.log( inputData );
    console.log( calData ); 
    // console.log( calData.bestreq ); 
    // console.log( String(calData.bestreq) );  
    // console.log(typeof calData.target[1] );

    const suggestionClick = () => {
        setShowSuggestion(!showSuggestion);
    };
    
    const saveClick = () => {   
        setShowSaveList(!showSaveList);
        console.log("result planner", showSaveList);
    };

    const changeCurrPlanName = (name) => {
        setCurrPlanName(name);
    }

    return(
        <div className='gachaPlanner-result-container'>
            <button className='save-button' onClick={saveClick}>
                <img src={charIcon}></img>
                <h1>{currPlanName}</h1>
                <img className="save-icon" src={saveIcon}></img>
            </button> 
            {showSaveList && <SaveDropdown trigger={showSaveList} saveClickFunc={saveClick} inputData={inputData} calData={calData} currName={changeCurrPlanName}>
            </SaveDropdown>}
            <div className='symbol-container'>
                <div className='info'>
                    <div className="circle-container">
                        <img src={targetPic}></img>
                    </div>
                    <div className='symbol-name-container'>Target Patch</div>
                    <div className='symbol-info'>{ calData.target[0] }</div>
                    
                    {<div className='symbol-info'>{ calData.target[1] === 1 ? 'First half' : 'Second half' }</div>}
                </div>
                <div className='info'>
                    <div className="circle-container">
                        <img src={primogmPic}></img>
                    </div>
                    <div className='symbol-name-container'>Primogems</div>
                    <div className='symbol-info'>0/{ inputData.fiveorprimos === 0 ? String(calData.bestreq) : String(calData.primoreq) }</div>
                    {/* {inputData.fivorprimos === 0 && <div className='symbol-info'>{String(calData.worsereq)}</div>}   */}
                    {/* <div className='symbol-info'>First half</div> */}
                </div>
                {/* <div className='info'>
                    <div className="circle-container">
                        <img src={genesisPic}></img>
                    </div>
                    <div className='symbol-name-container'>Target Patch</div>
                    <div className='symbol-info'>4.0</div>
                    <div className='symbol-info'>First half</div>
                </div> */}
            </div>
            <ul className='informationText'>
                <li>Currently, you have <span className='input-text'>{inputData.primogems}</span> Primogems and <span className='input-text'>{inputData.crystals}</span> Genesis Crystals. in total you have <span className='result-text'>{calData.currenttotal}</span> Primogems</li>
                <li>Given that you do the commission, login every day and complete the Battle Pass(if you purchased Gnostic Hymn), you will earn <span className='result-text'>{calData.primosmade}</span> Primogems.</li>
                <li>In total you will have <span className='result-text'>{calData.primos4free}</span> Primogems in patch <span className='result-text'>{calData.target[0]} { calData.target[1] === 1 ? 'First half' : 'Second half' }</span> which means that you have roll for <span className='result-text'>{calData.fates4free}</span> Intertwined Fates and 60 Primogems.</li>
                {inputData.fiveorprimos === 0 && <li>For <span className='input-text'>{inputData.fivestars}</span> five star characters, your best case is <span className='input-text'>{calData.bestreq}</span> Primogem and your worse case is <span className='input-text'>{calData.worsereq}</span> Primogems.</li>}
                {inputData.fiveorprimos === 1 && <li>You need <span className='input-text'>{calData.primoreq}</span> more Primogems to get the amount you want that is <span className='input-text'>{inputData.primowant}</span></li>}
            </ul>
            <button 
                className={`suggestion-button ${showSuggestion ? 'active' : 'inactive'}`}
                onClick={suggestionClick}>
                <h1>Suggestion</h1>
                <img className={`arrow-icon ${showSuggestion ? 'active' : 'inactive'}`} src={arrow}></img>
            </button>
                {showSuggestion && inputData.fiveorprimos === 0 && <div className='informationText'>
                    <div>5 star best case</div>
                    <ul>
                        {calData.bestreq > calData.primos4free && <li>If you purchase <span className='input-text'>{calData.bestwelk}</span> blessing of the Welkin Moon, and <span className='input-text'>{calData.bestbp}</span> Battle pass you can earn more <span className='input-text'>{calData.possible}</span> Primogems</li>}
                        {calData.bestreq > calData.primos4free && calData.bestextra !== 0 && <li>but still have more <span className='input-text'>{calData.bestextra}</span> Primogems to purchase</li>}
                        {calData.bestreq <= calData.primos4free && <div>good job, happy gambling</div>}
                    </ul>
                    <div>5 star worse case</div>
                    <ul>
                        {calData.worsereq > calData.primos4free && <li>If you purchase <span className='input-text'>{calData.worsewelk}</span> blessing of the Welkin Moon, and <span className='input-text'>{calData.worsebp}</span> Battle pass you can earn more <span className='input-text'>{calData.possible}</span> Primogems</li>}
                        {calData.worsereq > calData.primos4free && calData.worseextra !== 0 && <li>but still have more <span className='input-text'>{calData.worseextra}</span> Primogems to purchase</li>}
                        {calData.worsereq <= calData.primos4free && <div>good job, happy gambling</div>}
                    </ul>
                </div>}    
                {showSuggestion && inputData.fiveorprimos === 1 && <div className='informationText'>
                    <div>Primogems as a goal</div>
                    <ul>
                        {calData.primoreq > calData.primos4free && <li>If you purchase <span className='input-text'>{calData.planwelk}</span> blessing of the Welkin Moon, and <span className='input-text'>{calData.planbp}</span>  Battle pass you can earn more <span className='input-text'>{calData.possible}</span> Primogems</li>}
                        {calData.primoreq > calData.primos4free && calData.planextra !== 0 && <li>but still have more <span className='input-text'>{calData.planextra}</span> Primogems to purchase</li>}
                        {calData.primoreq <= calData.primos4free && <div>good job, happy gambling</div>}
                    </ul>
                </div>}
        </div>
    )
};

export default ResultPlanner;