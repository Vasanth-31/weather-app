import React from 'react';
import SignUpForm from './SignUpForm';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';


function Hero() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUpForm />}/>
        <Route path="/signup" element={<SignUpForm />}/>
        {/* <Route path="/login" element={<Signin />} /> */}
        <Route path='/signin' element={<Login/>}></Route>
        <Route path="/home" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Hero;
