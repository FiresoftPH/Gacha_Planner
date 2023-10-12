import EulaPic from '../../Pictures/Eula.png'
import EulaInfo from '../../Pictures/EulaInfo.png'
import './CharacterList.css';
export default function BannerChBoxElement({handleClick,chName,lastPatch,index_val}){
    return(
        <div className='banner-ch-container'>
        <button className='banner-character-button' onClick={() => handleClick(1)}><img className='banner-character-img' src={EulaInfo}></img></button>
        <div className='banner-character-detail'>
            <p className='banner-character-detail-text'>{lastPatch}</p>
            <p className='banner-character-detail-text1'>yo</p>
            
        </div>
        <p className='banner-ch-name'>{chName}</p>
    </div>
    );
}