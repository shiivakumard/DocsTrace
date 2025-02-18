import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Footer from './pages/Footer';
import SignUp from './registration/SignUp';
import Login from './registration/Login';
import ForgotPassword from './registration/ForgotPassword';
import SetPassword from './registration/SetPassword';
import Dummy from './pages/DummyPage';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<>
          <LandingPage/>
         
          {/* <Card/> */}
          <Footer/>
          </>
          } />
        <Route path='SignUp' element={<SignUp/>} />
        <Route path ="Login" element={<Login/>} />
        <Route path="ForgotPassword" element={<ForgotPassword/>} />
        <Route path='SetPassword' element={<SetPassword/>} />
        <Route path="/Dummy" element={<Dummy />} />
        <Route path="/HomePage" element={<HomePage/>}/>

      </Routes>
    
    </Router>
  );
};

export default App;
