import { useState,useEffect } from 'react';
import './banner_history.css'
import EulaPic from '../../Pictures/Eula.png'
import EulaInfo from '../../Pictures/EulaInfo.png'
import Timeline from '../../Components/TimelineComp/TimelineComp'
import Topbar from '../../Components/TopBarComponent/Topbar';
import '../../Components/TimelineComp/timeline.css'
import CharacterInfo from '../../Components/BannerCharacterInfo/CharacterInfo';
import CharacterList from '../../Components/BannerChList/CharacterList';
import BannerChBoxElement from '../../Components/BannerChList/BannerChBox';
import axios from 'axios'




export default function BannerHistory(){


    const [index, setIndex] = useState(0);
    const handleClick = (newState) => {
        setIndex(newState);
    };


    axios.defaults.baseURL = 'http://localhost:5000'; // Replace with your API URL
    axios.defaults.withCredentials = true;


    const [post,setPost] = useState(null);
    axios.get('/api/get/recent-rerun-history')
    .then(response => {
    // Handle the response
    
    setPost(response.data)
    
    
        })
    .catch(error => {
    // Handle errors
    
  });
 
  
  if (!post) return null;
    
    post.forEach(item => {
    for (const key in item) {
        const value = item[key];
       // console.log(`Key: ${key}, Value: ${value}`);
    }
    });

    const results = post.map(item => {
        const keyValuePairs = Object.entries(item);
        return keyValuePairs.map(([key, value]) => `Key: ${key}, Value: ${value}`);
      });
      
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
                <div className='character-list'>
                    <p>Genshin Impact Character List</p>
                    <div className='banner-character-list-container'>
        
                    <div className="vertical-scrolling-box">
                        <div className='character-position'>
                            {results.map((keyValuePairs, index) => (
                            <div key={index}>
                            {keyValuePairs.map(([key, value]) => (
                            <BannerChBoxElement key={key} handleClick={handleClick} chName={key} lastPatch={value}/>
                                ))}
                        </div>
                        ))}
                    </div>
                    </div>
                    </div>
                </div>
                <CharacterInfo props_index={index}/>
            </div>
        </div>
        <Topbar/>
    </div>
    );
}



