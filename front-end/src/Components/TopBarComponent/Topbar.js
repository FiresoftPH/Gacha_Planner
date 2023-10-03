import './Topbar.css'
import myPic from '../../Pictures/wisher_header.png'
import headerIcon from '../../Pictures/Profile.png'
import { useNavigate } from 'react-router-dom';

export default function Topbar(){

const navigateToDestination = () => {
    navigate('/yourplanner');
    };  

const navigateToDestination2 = () => {
    navigate('/bannerhistory');
    };  


const navigateToLogin = () => {
    navigate('/login');
    };  


const navigate = useNavigate();
return(
<div className='banner-header'>
    <div className="banner-header-pic-container">
        <img className='banner-header-pic' src={myPic}></img>
    </div>
    <button className='planner-button'> Gacha Planner</button>
    <button onClick={navigateToDestination2} className='banner-button'>Banner History</button>
    <button onClick={navigateToDestination} className='yourplanner-button'>Your Planner</button>
    <div className='banner-user-profile-container'>
        <button className='navigate-to-login' onClick={navigateToLogin}><img className="banner-user-profile" src={headerIcon} alt="Wisher" /></button>
    </div>
</div>);

}