export default function BannerChBoxElement({ handleClick, chName, lastPatch, data, indexVal,date,element,weapon,patchHalf,stats}) {
  const statsArray = stats;
  const lastElement = statsArray[statsArray.length - 1];
  const imagePath = getImagePathForCharacter(chName);
  let word_patch;
 
  if (patchHalf === 1) {
    word_patch =  "First Half";
  } else if (patchHalf === 2) {
    word_patch =  "Second Half";
  }


  return (
    <div className="banner-ch-container">
      <button className="banner-character-button" onClick={() => handleClick(chName,lastPatch,date,element,weapon,patchHalf)}>
        <ImageGallery imagePath={imagePath} />
      </button>
      <div className="banner-character-detail">
        <p className="banner-character-detail-text">{lastPatch} {word_patch}</p>
        <p className="banner-character-detail-text1">{lastElement}</p>
      </div>
      <p className="banner-ch-name">{chName}</p>
    </div>
  );
}


const ImageGallery = ({ imagePath }) => {
  //console.log({imagePath})
  return (
    <div>
      <img className="banner-character-img" src={imagePath} alt="Character" />
    </div>
  );
};

// Function to get the image path for a character
function getImagePathForCharacter(chName) {
  const lowerCaseChName = chName.toLowerCase();
  const formattedName = lowerCaseChName.replace(/\s/g, '-');
  const return_val = process.env.PUBLIC_URL + '/character-img/'+formattedName+'-icon.png';
  // console.log(lowerCaseChName)
  // console.log(return_val)
  //console.log(`./character-img/${lowerCaseChName}-icon.png`)
  return return_val;
}
