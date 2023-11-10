import './Topbar.css'
import myPic from '../../Pictures/wisher_header.png'
import headerIcon from '../../Pictures/Profile.png'
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';

export default function Topbar(){

    const location = useLocation();
    const buttonGachaPlanner = location.pathname === '/' ? 'topbar-button-clicked' : 'topbar-button';
    const buttonYourplanner = location.pathname === '/yourplanner' ? 'topbar-button-clicked' : 'topbar-button';
    const buttonBannerHistory = location.pathname === '/bannerhistory' ? 'topbar-button-clicked' : 'topbar-button';
    
const navigateToGachaPlanner = () => {
        navigate('/');
    };  

const navigateToYourPlanner = () => {
    navigate('/yourplanner');
    };  

const navigateToBannerHistory = () => {
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
    <button onClick={navigateToGachaPlanner}  className={buttonGachaPlanner}>Gacha Planner</button>
    <button onClick={navigateToBannerHistory}  className={buttonBannerHistory}>Banner History</button>
    <button onClick={navigateToYourPlanner} className={buttonYourplanner}>Your Planner</button>
    <button className='topbar-navigate-to-login' onClick={navigateToLogin}><img className="topbar-user-profile" src={headerIcon} alt="Wisher" /></button>
</div>);

}