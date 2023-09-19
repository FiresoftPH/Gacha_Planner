import { useState } from 'react';
import './home_page.css'
import headerIcon from './WhishIcon.png'
export default function HomeElement(){
    
    const [showHistory,setShowHistory] = useState(false);
    const banner_clicked=()=>{
        setShowHistory(true);
    }
    const planner_clicked=()=>{
        setShowHistory(false);
    }
    return(
    <div className='home-page'>
        <div className='header'>
            <div className="header-text">Gacha Planner</div>           
            <button onClick={planner_clicked} className='planner-button'>Planner</button>
            <button onClick={banner_clicked} className='banner-button'>Banner History</button>

        </div>
        {showHistory ? (
        <HistoryComponent></HistoryComponent>
      ) : (
        <PlannerComponent></PlannerComponent>
      )}
        
    </div>
    );
}

function PlannerComponent(){
    return(
    <div className="planners">
        <div className="gacha-planner">
            <div className="gacha-planner-header">
                <img className="header-image" src={headerIcon} alt="Logo" />
                <div className='header-gacha-text'>Gacha Planner</div>
            </div>
            <div className="gacha-message"></div>
        </div>
        <div className='current-plan'></div>
        <div className='suggestion'></div>
    </div>
    );
}

function HistoryComponent(){
    return(
    <div className="banner-history">
        <div className="gacha-planner">
            <div className="gacha-planner-header">
                <div className='header-gacha-text'>Banner History</div>
            </div>

        </div>

    </div>
    );
}