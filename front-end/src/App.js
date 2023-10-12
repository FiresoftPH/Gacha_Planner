import './App.css';
import { useEffect, useState } from 'react';
import AppRouter from './Router';

function App() {
  
  const makeAPICall = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/get/recent-rerun-history', {mode:'cors'});
      const data = await response.json();
      console.log({ data })
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    makeAPICall();
  }, [])

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
