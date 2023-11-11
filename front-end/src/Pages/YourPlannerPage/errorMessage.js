

import pic3 from '../../Pictures/emoji.jpg'

import './errorMsg.css'

export default function ErrorMessage(){
    return(
            <div className='error-container'>
                <img className='emoji-face' src={pic3}></img>
                <div className='error-text'>No save data found</div>

            </div>
    );

}