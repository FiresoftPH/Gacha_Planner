import { useState, useEffect } from 'react';
import React from 'react';
import axios from '../../axiosConfig'
import './resultPlanner.css'
import targetPic from '../../Pictures/targetSymbol.png'
import primogmPic from '../../Pictures/primogemSymbol.png'
import genesisPic from '../../Pictures/genesiscrystalSymbol.png'
import SaveDropdown from '../SaveDropdown/saveDropdown.js'
import charIcon from '../../Pictures/charIcon.png'
import saveIcon from '../../Pictures/saveIcon.png'
import arrow from '../../Pictures/arrow.png'
import editIcon from '../../Pictures/editIcon.png'
import yesIcon from '../../Pictures/yesIcon.png'
import noIcon from '../../Pictures/noIcon.png'
import deleteIcon from '../../Pictures/deleteIcon.png'
import questIcon from '../../Pictures/questIcon.png'
import charBigIcon from '../../Pictures/charBigIcon.png'

function ResultPlanner( props ){
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [calData, setOutputResult] = useState(null);
    // const [showSaveList, setShowSaveList] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [shouldUnmount, setShouldUnmount] = useState(false);
    const inputData = props.userInputData;
    const isTracking = props.isTracking;
    const [currPlanName, setCurrPlanName] = useState(
        isTracking ? props.planName : "Current plan"
      );
      const [originalName, setOriginalName] = useState(
        isTracking ? props.planName : "Current plan"
      );
    // const calData = props.userResultData;
    const planName = props.planName;
    const username = props.username;
    console.log( "input in resultPlanner", inputData );
    console.log( "output in resultPlanner",calData ); 
    console.log( "name of this plan",planName )
    // console.log( calData.bestreq ); 
    // console.log( String(calData.bestreq) );  
    // console.log(typeof calData.target[1] );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('/planner/calculate', inputData);
                setOutputResult(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
        console.log("ahuhihuhi", props.userInputData);
        console.log("haiyaa", calData);
    }, [props.fetchTrigger, props.inputData]);
    
    
    const suggestionClick = () => {
        setShowSuggestion(!showSuggestion);
    };

    const selectName = (name) => {
        setCurrPlanName(name);
    };
    
    const saveClick = () => {   
        // setShowSaveList(true);
        setEditing(true);
        // console.log("result planner", isEditing);
    };

    const handleInputChange = (e) => {
        setCurrPlanName(e.target.value);
    };

    const handleSaveClick = (name) => {
        const load = {
            "username": username,
            "input": inputData,
            "output": calData,
            "save_name": name
        }
        axios.post('/planner/save-data', load)
        .then(response => console.log(response))
        .catch(err => console.error('Error: ', err))
        setOriginalName(name)
        setCurrPlanName(name)
        // console.log(username);
        setEditing(false);
    };

    const handleCancelClick = () => {
        setCurrPlanName(originalName)
        setEditing(false);
    };

    const handle_delete = async (name) => {
        const del = {
            "username": username,
            "save_name": name
        };

        try {
            await axios.post('/user/delete-data', del);
            // await fetchSaveList();
            console.log('Data has been deleted successfully.');
            setShouldUnmount(true);
        } catch (err) {
            console.error('Error deleting data: ', err);
        }
    }

    if (shouldUnmount) {
        return null;
      }

    return calData && (
        <div className='gachaPlanner-result-container'>
            <div className='plan-header' >
                <img src={questIcon}></img>
                {isEditing ? (
                    <div className='name-n-icon'>
                        <input
                            type="text"
                            value={currPlanName}
                            onChange={handleInputChange}
                        />
                        <div className='yesNno-icon-container'>
                            <div className='yesNno-icon-subcontainer'>
                                <button onClick={(e) => handleSaveClick(currPlanName)}><img src={yesIcon}></img></button>
                                <div className='yesNo-text'>save</div>
                            </div>
                            <div className='yesNno-icon-subcontainer'>
                                <button onClick={handleCancelClick}><img src={noIcon}></img></button>
                                <div className='yesNo-text'>cancel</div>
                            </div>
                        </div>
                    </div>
                    ) : (<div className='name-n-icon'> 
                            <h1>{currPlanName}</h1>
                            <div className='only-icon'> 
                                <button className='save-icon' onClick={saveClick}>
                                    <img src={saveIcon}></img>
                                </button>
                                {isTracking && (<button className='delete-icon' onClick={() => handle_delete(planName)}>
                                    <img src={deleteIcon}></img>
                                </button>)}
                            </div>
                        </div>
                    
                )}
            </div> 
            {!isTracking && isEditing && <SaveDropdown saveClickFunc={saveClick} inputData={inputData} calData={calData} planName={selectName} currPlanName={currPlanName} username={username}>
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
                        <img src={ inputData.fiveorprimos === 0 ? (charBigIcon) : (primogmPic) }></img>
                    </div>
                    <div className='symbol-name-container'>Primogems</div>
                    { inputData.fiveorprimos === 0 ? 
                        ( <div className='symbol-info'>
                            <div>{String(calData.bestreq)}</div>
                            <div>{String(calData.worsereq)}</div>
                        </div>
                        ) : ( 
                            <div className='symbol-info'>{String(calData.primoreq)}</div>
                    )}
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
                {inputData.fiveorprimos === 0 && <li>For <span className='input-text'>{inputData.fivestars}</span> five stars character(s), your best case is <span className='input-text'>{calData.bestreq}</span> Primogems and your worse case is <span className='input-text'>{calData.worsereq}</span> Primogems.</li>}
                {inputData.fiveorprimos === 1 && <li>You need <span className='input-text'>{calData.primoreq}</span> more Primogems to get the amount you want that is <span className='input-text'>{inputData.primowant}</span></li>}
            </ul>
            <button 
                className={`suggestion-button ${showSuggestion ? 'active' : 'inactive'}`}
                onClick={suggestionClick}>
                <h1>Suggestion</h1>
                <img className={`arrow-icon ${showSuggestion ? 'active' : 'inactive'}`} src={arrow}></img>
            </button>
                {showSuggestion && inputData.fiveorprimos === 0 && <div className='informationText'>
                    <h1 className='fiveorprimos-header'>5 star best case</h1>
                    <ul>
                        {calData.bestreq > calData.primos4free && <li>If you purchase <span className='input-text'>{calData.bestwelk}</span> Blessing of the Welkin Moon, and <span className='input-text'>{calData.bestbp}</span> Battle pass you can earn more <span className='input-text'>{calData.possible}</span> Primogems</li>}
                        {calData.bestreq > calData.primos4free && calData.bestextra !== 0 && <li>Or you can purchase <span className='input-text'>{calData.bestextra}</span> Primogems instead</li>}
                        {calData.bestreq <= calData.primos4free && <li>good job, happy gambling</li>}
                    </ul>
                    <h1 className='fiveorprimos-header'>5 star worse case</h1>
                    <ul>
                        {calData.worsereq > calData.primos4free && <li>If you purchase <span className='input-text'>{calData.worsewelk}</span> Blessing of the Welkin Moon, and <span className='input-text'>{calData.worsebp}</span> Battle pass you can earn more <span className='input-text'>{calData.possible}</span> Primogems</li>}
                        {calData.worsereq > calData.primos4free && calData.worseextra !== 0 && <li>Or you can purchase <span className='input-text'>{calData.worseextra}</span> Primogems instead</li>}
                        {calData.worsereq <= calData.primos4free && <li>good job, happy gambling</li>}
                    </ul>
                </div>}    
                {showSuggestion && inputData.fiveorprimos === 1 && <div className='informationText'>
                    <h1 className='fiveorprimos-header'>Primogems as a goal</h1>
                    <ul>
                        {calData.primoreq > calData.primos4free && <li>If you purchase <span className='input-text'>{calData.planwelk}</span> Blessing of the Welkin Moon, and <span className='input-text'>{calData.planbp}</span>  Battle pass you can earn more <span className='input-text'>{calData.possible}</span> Primogems</li>}
                        {calData.primoreq > calData.primos4free && calData.planextra !== 0 && <li>Or you can purchase <span className='input-text'>{calData.planextra}</span> Primogems instead</li>}
                        {calData.primoreq <= calData.primos4free && <li>good job, happy gambling</li>}
                    </ul>
                </div>}
        </div>
    )
};

export default ResultPlanner;