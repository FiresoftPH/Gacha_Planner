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
 
  const handleClick = (newState) => {
        setIndex(newState);
        console.log({index});
    };
  if (!post) return null;
    

    // const results = post.map(item => {
    //     const keyValuePairs = Object.entries(item);
    //     keyValuePairs.forEach(([key, value]) => {
    //         console.log(`Key: ${key}, Value: ${value}`);
    //       });
    //     return keyValuePairs.map(([key, value]) => (<BannerChBoxElement handleClick={handleClick} chName={key} lastPatch={value} data={post}></BannerChBoxElement>
    //     ));  
    // });
    // Object.entries(post).map(([key, value]) => {
    //     console.log('hi'); // You can include console.log statements here
    //     const searchKey = key; // Remove curly braces around 'key'
    //     const keys = Object.keys(data);
    //     const indexValue = keys.indexOf(searchKey) + 1;
    //   });
      
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
                            {Object.entries(post).map(([key, value]) => {
                                console.log('hi'); // Include console.log within curly braces
                                const searchKey = key; // Remove curly braces around 'key'
                                const keys = Object.keys(post);
                                const indexValue = keys.indexOf(searchKey) + 1;
                                return (
                                    <BannerChBoxElement
                                    key={key}
                                    handleClick={handleClick}
                                    chName={key}
                                    lastPatch={value}
                                    data={post}
                                    indexVal={indexValue}
                                    />
                                );
                                })}
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



