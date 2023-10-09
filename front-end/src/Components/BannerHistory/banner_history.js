import { useState } from 'react';
import './banner_history.css'
import EulaPic from '../../Pictures/Eula.png'
import { characterList } from './characters_info';
import TimeLine from '../../Pictures/timeline.png'
import Topbar from '../TopBarComponent/Topbar';
import './timeline.css'

export default function BannerHistory(){

    const [index, setIndex] = useState(0);
    const handleClick = (newState) => {
        setIndex(newState);
    };


    const HorizontalScrollGrid = () => {
    return (
    <div className="horizontal-scrolling-box">
        <div className="content">
          <Timeline></Timeline>
        </div>
    </div>
    );
    };

    let character = characterList[index];

    return(
    <div className='banner-page'>
        

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
                    
                    <div className="vertical-scrolling-box">
                        <div><button className='banner-character-button' onClick={() => handleClick(1)}><img src={EulaPic}></img></button></div>
                        <div><button onClick={() => handleClick(2)}>Button</button></div>
                        <div><button onClick={() => handleClick(3)}>Button</button></div>
                        <div><button onClick={() => handleClick(2)}>Button</button></div>
                        
                        <div><button className='banner-character-button' onClick={() => handleClick(1)}><img src={EulaPic}></img></button></div>
                        <div><button onClick={() => handleClick(2)}>Button</button></div>
                        <div><button onClick={() => handleClick(3)}>Button</button></div>
                        <div><button onClick={() => handleClick(2)}>Button</button></div>
                        
                        <div><button className='banner-character-button' onClick={() => handleClick(1)}><img src={EulaPic}></img></button></div>
                        <div><button onClick={() => handleClick(2)}>Button</button></div>
                        <div><button onClick={() => handleClick(3)}>Button</button></div>
                        <div><button onClick={() => handleClick(2)}>Button</button></div>
                        <div><button className='banner-character-button' onClick={() => handleClick(1)}><img src={EulaPic}></img></button></div>
                        <div><button onClick={() => handleClick(2)}>Button</button></div>
                        <div><button onClick={() => handleClick(3)}>Button</button></div>
                        <div><button onClick={() => handleClick(2)}>Button</button></div>
                    </div>
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
        <Topbar/>
    </div>
    );
}


function Timeline() {
    
    return (
    <div>
      <TimelineElement patch={1.0}/>
      <TimelineElement patch={2.0}/>
      <TimelineElement patch={3.0}/>
      <TimelineElement patch={4.0}/>
    </div>
    );
  }
  
  function TimelineElement({patch}){
    return(
    <div className="timeline-component">
        <div className="component-25">
            <div className="vertical-line"></div>
            <div className="vertical-line2"></div>
            <div className="line-horizontal"></div>
            <div className="ellipse-8">
                <div className="ellipse-text">{patch}</div>
            </div>
        </div>
        <TimeLinecomponent2 p={patch+0.1}/>
        <TimeLinecomponent2 p={patch+0.2}/>
        <TimeLinecomponent2 p={patch+0.3}/>
        <TimeLinecomponent2 p={patch+0.4}/>
      </div>
    );
  }

  function TimeLinecomponent2({p}){
    return(
    <div className="timeline-component2">
        <div className="vertical-line"></div>
        <div className="vertical-line2"></div>
        <div className="line-horizontal"></div>
        <div className="rectangle-container">
            <div className="rectangle-58">
                <span className="rectangle-text">{p}</span>
            </div>
        </div>

    </div>
    
    );
  }