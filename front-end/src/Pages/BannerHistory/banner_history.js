import { useState } from 'react';
import './banner_history.css'
import EulaPic from '../../Pictures/Eula.png'
import EulaInfo from '../../Pictures/EulaInfo.png'
import Timeline from '../../Components/TimelineComp/TimelineComp'
import Topbar from '../../Components/TopBarComponent/Topbar';
import '../../Components/TimelineComp/timeline.css'
import CharacterInfo from '../../Components/BannerCharacterInfo/CharacterInfo';
import CharacterList from '../../Components/BannerChList/CharacterList';

export default function BannerHistory(){

    const [index, setIndex] = useState(0);
    const handleClick = (newState) => {
        setIndex(newState);
    };

    return(
    <div className='banner-page'>
        
        <div className='banner-body'>
            <div className='banner-timeline'>
                <div className='banner-body-header'>
                    <p className='banner-body-header-text'>Timeline Banner History</p>
                    <Timeline></Timeline>
                </div>
            </div>
            <div className='banner-characters-section'>
                <CharacterList handleClick={handleClick}/>
                <CharacterInfo props_index={index}/>
            </div>
        </div>
        <Topbar/>
    </div>
    );
}

