import './CharacterInfo.css';
import { characterList } from '../../Pages/BannerHistory/characters_info';

export default function CharacterInfo({ chName, patch, date, element, weapon,patchHalf }) {
  const imagePath = getImagePathForCharacter(chName);

  return (
    <div className='character-info'>
      <p>Character info</p>
      <div className='banner-info-container'>
        <div className='banner-info-pictext'>
          {typeof chName === 'string' ? (
            <div>
                <img className='banner-info-pic' src={imagePath} alt='h' />
                <div className='banner-character-info-text'>
                    <p>Name: {chName}</p>
                    <p>Elemental: {element}</p>
                    <p>Last Patch Rerun: {patch}</p>
                    <p>Patch Half: {patchHalf}</p>
                    <p>Date: {date}</p>
                </div>
          </div>
          ) : (
            <div></div>
          )}

        </div>
      </div>
    </div>
  );
}

function getImagePathForCharacter(chName) {
  if (typeof chName === 'string') {
    const lowerCaseChName = chName.toLowerCase();
    const formattedName = lowerCaseChName.replace(/\s/g, '-');
    const return_val = process.env.PUBLIC_URL + '/character-img/' + formattedName + '-icon.png';
    return return_val;
  } else {
    // Handle the case where chName is not a string, e.g., provide a default value or handle the error.
    return 'default-image-path.png';
  }
}
