import EulaPic from '../../Pictures/Eula.png'
import EulaInfo from '../../Pictures/EulaInfo.png'

import "./CharacterList.css"
export default function CharacterList({handleClick}){
    return(
    <div className='character-list'>
        <p>Genshin Impact Character List</p>
        <div className='banner-character-list-container'>
        
        <div className="vertical-scrolling-box">
            <div>
                <button className='banner-character-button' onClick={() => handleClick(1)}><img className='banner-character-img' src={EulaInfo}></img></button>
                <div className='banner-character-detail'>
                    <p className='banner-character-detail-text'>69 second</p>
                    <p className='banner-character-detail-text1'>yo</p>
                    
                </div>
                <p className='banner-ch-name'>Eula</p>
            </div>
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
    )
}