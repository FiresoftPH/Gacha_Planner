import HomeElement from './YourPlannerPage/home_page';
import './App.css';
import LoginComp from './LoginComponent/login'
import SignupComp from './SignupComponent/signup';
import BannerHistory from './BannerHistory/banner_history';
import AppRouter from './Router';

function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
