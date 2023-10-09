import './Topbar.css'
import myPic from '../../Pictures/wisher_header.png'
import headerIcon from '../../Pictures/Profile.png'
import { useNavigate } from 'react-router-dom';

export default function Topbar(){

const navigateToGachaPlanner = () => {
    navigate('/');
    };

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
<div className='topbar-header'>
    <div className="topbar-header-pic-container">
        <img className='topbar-header-pic' src={myPic}></img>
    </div>
    <button onClick={navigateToGachaPlanner} className='planner-button'> Gacha Planner</button>
    <button onClick={navigateToDestination2} className='topbar-button'>Banner History</button>
    <button onClick={navigateToDestination} className='topbar-button'>Your Planner</button>
    <div className='topbar-user-profile-container'>
        <button className='topbar-navigate-to-login' onClick={navigateToLogin}><img className="topbar-user-profile" src={headerIcon} alt="Wisher" /></button>
    </div>
</div>);

}