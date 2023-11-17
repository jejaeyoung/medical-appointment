import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';



//Components
import LandingPage from './components/landpage/LandingPage';
import Login from './components/login/Login';

//Practitioner
import Dashboard from './components/practitioner/dashboard/Dashboard';
import EditMode from './components/practitioner/editmode/EditMode';


function App() {
  return (
    <>
    <p>dsadadd</p>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<LandingPage/>}></Route>
        <Route path='medapp/signup' element={<NewSignUp/>}> </Route>
        <Route path={"/practitioner/dashboard"}element={<Dashboard/>}/>
        <Route path={"/practitioner/dashboard/edit/:uid/:index"}element={<EditMode/>}/>  
      </Routes>
    </BrowserRouter>



    </>
  );
}

  
export default App;
