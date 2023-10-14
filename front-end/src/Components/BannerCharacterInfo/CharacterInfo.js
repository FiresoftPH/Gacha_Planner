import './CharacterInfo.css'
import { characterList } from '../../Pages/BannerHistory/characters_info';
export default function CharacterInfo({props_index}){
    let character = characterList[props_index];

    return(
        
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
    );

}

