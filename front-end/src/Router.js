import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GachaPlanner from './Components/GachaPlanner/gachaPlanner';
import LoginComp from './Components/LoginComponent/login';
import SignUpComp from './Components/SignupComponent/signup';
import HomeElement from './Components/YourPlannerPage/yourplanner'
import BannerHistory from './Components/BannerHistory/banner_history';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GachaPlanner/>} />
        <Route path="/login" element={<LoginComp/>} />
        <Route path="/signup" element={<SignUpComp/>} />
        <Route path="/yourplanner" element={<HomeElement/>} />
        <Route path="/bannerhistory" element={<BannerHistory/>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;