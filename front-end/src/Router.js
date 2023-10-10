import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GachaPlanner from './Pages/GachaPlanner/gachaPlanner';
import LoginComp from './Pages/LoginPage/login';
import SignUpComp from './Pages/SignUpPage/signup';
import HomeElement from './Pages/YourPlannerPage/yourplanner'
import BannerHistory from './Pages/BannerHistory/banner_history';

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