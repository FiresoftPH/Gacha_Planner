export default function BannerChBoxElement({ handleClick, chName, lastPatch, data, indexVal }) {
  // Find the image path based on chName
  const imagePath = getImagePathForCharacter(chName);


  return (
    <div className="banner-ch-container">
      <button className="banner-character-button" onClick={() => handleClick(chName,lastPatch)}>
        <ImageGallery imagePath={imagePath} />
      </button>
      <div className="banner-character-detail">
        <p className="banner-character-detail-text">{lastPatch}</p>
        <p className="banner-character-detail-text1">yo</p>
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
