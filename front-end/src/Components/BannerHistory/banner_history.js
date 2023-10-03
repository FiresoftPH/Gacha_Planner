import { useState } from 'react';
import './banner_history.css'
import headerIcon from '../../Pictures/Profile.png'
import myPic from '../../Pictures/wisher_header.png'
import EulaPic from '../../Pictures/Eula.png'
import { useNavigate } from 'react-router-dom';
import { characterList } from './characters_info';
import TimeLine from '../../Pictures/timeline.png'
import Topbar from '../TopBarComponent/Topbar';

export default function BannerHistory(){


    const [index, setIndex] = useState(0);

    

    const handleClick = (newState) => {
        setIndex(newState);
    };

    const navigate = useNavigate();
    const navigateToDestination = () => {
        navigate('/yourplanner');
      };  
    const HorizontalScrollGrid = () => {
    return (
    <div className="horizontal-scrolling-box">
        <div className="content">
          {/* Your content goes here */}
          <img className='timeline-pic' src={TimeLine} alt="Wisher" />
          {/* Add more content as needed */}
        </div>
      </div>
    );
    };

    let character = characterList[index];

    return(
    <div className='banner-page'>
        <Topbar/>

        <div className='banner-body'>
            <div className='banner-timeline'>
                <div className='banner-body-header'>
                    <p className='banner-body-header-text'>Timeline Banner History</p>
                    <HorizontalScrollGrid></HorizontalScrollGrid>

                    
                </div>
            </div>
            <div className='banner-characters-section'>
                <div className='character-list'>
                    <p>Genshin Impact Character List</p>
                    <div className='banner-character-list-container'>
                        <button className='banner-character-button' onClick={() => handleClick(1)}><img src={EulaPic}></img></button>
                        <button onClick={() => handleClick(2)}>Button</button>
                        <button onClick={() => handleClick(3)}>Button</button>
                        <button onClick={() => handleClick(2)}>Button</button>
                    </div>
                </div>
                <div className='character-info'>
                    <p>Character info</p>
                    <div className='banner-info-container'>
                        <div className='banner-info-pictext'>
                            <img className='banner-info-pic' src={character.Source} alt={character.alt}></img>
                            <div className='banner-character-info-text'>
                                <p>{character.name}</p>
                                <p>{character.Elemental}</p>
                                <p>{character.First_banner_date}</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
    
    </div>
    );
}
