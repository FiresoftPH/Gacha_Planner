import HomeElement from './home_page';
import './App.css';
import LoginComp from './login'
import SignupComp from './signup';
import AppRouter from './Router';
function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
