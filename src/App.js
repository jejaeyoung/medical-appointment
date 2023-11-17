import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';




//Components
import LandingPage from './components/landpage/LandingPage';
import Login from './components/login/Login';
import Dashboard from './components/practitioner/dashboard/Dashboard';


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<LandingPage/>}></Route>
        <Route path={"/practitioner/dashboard"}element={<Dashboard/>}/> 
      </Routes>
    </BrowserRouter>



    </>
  );
}

  
export default App;
