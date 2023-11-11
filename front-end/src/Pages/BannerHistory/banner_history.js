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
  const url = process.env.PUBLIC_URL + '/character-img/'+'venti'+'-icon.png';
  const url2 = process.env.PUBLIC_URL + '/character-img/'+'zhongli'+'-icon.png';
  const img_url = [url,url2]

  const characterGroups = [];

    const [originalName, setName] = useState(0);
    const [originalPatch, setPatch] = useState(0);
    const [dateInfo,setDateInfo] = useState(0);
    const [elementInfo,setElementInfo] = useState(0);
    const [weaponInfo,setWeaponInfo] = useState(0);
    const [patchHalfInfo,setPatchHalfInfo] = useState(0);
    
    
    const handleClick = (name, patch,dateInfo,elementInfo,weaponInfo,patchHalfInfo,patchGroup) => {
        setPatch(patch)
        //console.log('lollllll')
        
        //console.log({name});
        setName(name)
        setDateInfo(dateInfo)
        setElementInfo(elementInfo)
        setWeaponInfo(weaponInfo)
        setPatchHalfInfo(patchHalfInfo)
        
    };


    axios.defaults.baseURL = 'http://localhost:5000'; // Replace with your API URL
    axios.defaults.withCredentials = true;

  const [post, setPost] = useState([]);
  const [characterGroups2, setCharacterGroups] = useState({});

  useEffect(() => {
    // Perform the GET request when the component is mounted
    axios.get('/api/get/all-banner-data')
      .then(response => {
        // Handle the response
        setPost(response.data);
        const newCharacterGroups = {};

        Object.entries(response.data).forEach(([characterName, [element, weapon, dataArray, statsArray]]) => {
          dataArray.forEach(([[patchVersion, date], patchHalf]) => {
            if (!newCharacterGroups[patchVersion]) {
              newCharacterGroups[patchVersion] = {};
            }
  
            if (!newCharacterGroups[patchVersion][patchHalf]) {
              newCharacterGroups[patchVersion][patchHalf] = [];
            }
  
            newCharacterGroups[patchVersion][patchHalf].push(characterName);
          });
        });
  
        setCharacterGroups(newCharacterGroups);
      })
      .catch(error => {
        // Handle errors
        console.log(error);
      });
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    // Your component's rendering logic here
    <div className='banner-page'>
        
    <div className='banner-body'>
        <div className='banner-timeline'>
                <h1 className='banner-body-header-text'>Timeline Banner History</h1>
                <Timeline data={characterGroups2}></Timeline>
        </div>
        <div className='banner-characters-section'>
            <div className='character-list'>
                <p>Genshin Impact Character List</p>
                {/* <div className='banner-character-list-container'> */}
    
                    <div className="vertical-scrolling-box">
                        <div className='character-position'>
                        {Object.entries(post).map(([characterName, [element, weapon, dataArray,statsArray]]) => {
                            
                            const greatestDateArray = dataArray.reduce((max, item) => {
                                return item[0][1] > max[0][1] ? item : max;
                              }, dataArray[0]);

                            //console.log({statsArray})
                            const searchKey = characterName; // Remove curly braces around 'key'
                            const keys = Object.keys(post);
                            const indexValue = keys.indexOf(searchKey) + 1;
  
                            return (
                                <BannerChBoxElement
                                key={characterName}
                                handleClick={handleClick}
                                chName={characterName}
                                lastPatch={greatestDateArray[0][0]}
                                data={post}
                                indexVal={indexValue}
                                date={greatestDateArray[0][1]}
                                element={element}
                                weapon={weapon}
                                patchHalf = {greatestDateArray[1]}
                                stats={statsArray}
                                
                                />
                            );
                            })}
                    </div>
                    </div>
                {/* </div> */}
            </div>
           
            <CharacterInfo chName={originalName} patch={originalPatch} date={dateInfo} element={elementInfo} weapon={weaponInfo} patchHalf={patchHalfInfo}/> 

        </div>
    </div>
    <Topbar/>
</div>
  );
}
 

  
    

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
      





