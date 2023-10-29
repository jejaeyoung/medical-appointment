import logo from './logo.svg';
import './App.css';
import LandingPage from './components/landpage/LandingPage';
import Login from './components/login/Login';
import React from 'react';

function App() {
  return (
    <>
    <p>Name/Position/GithubUsername</p>
      <hr/>
      <p>Daniel Sebastian G. Quilatan</p>
      <p>Project Manager</p>
      <p>jejaeyoung</p>
     
      <hr/>
    <p>Mali</p>
    <LandingPage/>
    <Login/>
    </>
  );
}

export default App;
