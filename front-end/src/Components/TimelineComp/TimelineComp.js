import React, { useState } from 'react';

export default function Timeline({data}) {

  const dataArray = Object.entries(data);

  // Sort the array based on keys (accounting for decimal keys)
  dataArray.sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]));
  
  // Convert the sorted array back to an object
  const sortedObject = Object.fromEntries(dataArray);

  return(
    <div className="horizontal-scrolling-box">
      <div className="content">
        <div className='banner-timeline-container'>
          <div className="character-item">
            {Object.entries(sortedObject).map(([version_num, characters]) => (
                <div className='timelineComp-cont'>
                <TimelineComponent
                  key={version_num}
                  version={version_num}
                  characterArray={characters[1]}
                  characterArray2 = {characters[2]}
                  half={Object.keys(characters)[0]}
                  ch= {characters}
                />
                </div>
      )
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
}

function TimelineComponent({version,characterArray,characterArray2,half,ch}) {
  const ch_src = getImagePathForCharacter(characterArray[0].toString());
  console.log(ch_src)
  let ch_src2;
  let ch_src3;
  let ch_src4;
  let display_second_vertical_line;
  if (characterArray[1]) {
    ch_src2 = getImagePathForCharacter(characterArray[1].toString());
 
  }
 


  if (characterArray2){
    display_second_vertical_line = 'vertical-line';
  
  if (characterArray2[0]) {
    ch_src3 = getImagePathForCharacter(characterArray2[0].toString());
  }
  if (characterArray2[1]) {
    ch_src4 = getImagePathForCharacter(characterArray2[1].toString());
    
  }

  
}else{
  display_second_vertical_line=''
}
let shape;
let pointOh;
let shapeText;
let even_version;

if (even_version = parseInt(version[0],10)%2 === 0) {
pointOh = version[2] === '0';
shape = pointOh ? 'rectangle-58-org' : 'ellipse-8-org';
shapeText = pointOh ? 'rectangle-text' : 'ellipse-text';
}else{
  pointOh = version[2] === '0';
  shape = pointOh ? 'rectangle-58' : 'ellipse-8';
  shapeText = pointOh ? 'rectangle-text' : 'ellipse-text';
}

  return (
    <div>
        <div className="timeline-component">
          <div className='element1'>
              <div className={display_second_vertical_line}></div>
              <div className='img-test-container1'>
                <img className='img-test' src={ch_src} alt="Character Image" />
                <img className='img-test' src={ch_src2}/>
                
              </div>
              <div className='vertical-line2'></div>
              <div className='img-test-container2'>
                <img className='img-test' src={ch_src3}/>
                <img className='img-test' src={ch_src4} />
              </div>
              <div className="line-horizontal"></div>
              <div className={shape}>
                <div className={shapeText}>{version}</div>
              </div>
          </div>
          
        </div>

    </div>
  );
}

function getImagePathForCharacter(chName) {
  const lowerCaseChName = chName.toLowerCase();
  const formattedName = lowerCaseChName.replace(/\s/g, '-');
  const return_val = process.env.PUBLIC_URL + '/character-img/' + formattedName + '-icon.png';
  return return_val;
}
