import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginComp from './LoginComponent/login';
import SignUpComp from './SignupComponent/signup';
import HomeElement from './YourPlannerPage/home_page'

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginComp/>} />
        <Route path="/signup" element={<SignUpComp/>} />
        <Route path="/yourplanner" element={<HomeElement/>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;