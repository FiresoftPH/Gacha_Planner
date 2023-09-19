import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginComp from './login';
import SignUpComp from './signup';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginComp/>} />
        <Route path="/signup" element={<SignUpComp/>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;