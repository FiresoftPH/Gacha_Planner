
import BannerChBoxElement from './BannerChBox.js'

import "./CharacterList.css"

export default function CharacterList(){
    return(
    <div className='character-list'>
        <p>Genshin Impact Character List</p>
        <div className='banner-character-list-container'>
        
        <div className="vertical-scrolling-box">

            <BannerChBoxElement></BannerChBoxElement>


        </div>
        </div>
    </div>
    )
}

