import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


//Components
import LandingPage from './components/landpage/LandingPage';
import Login from './components/login/Login';
import NewSignUp from './components/login/NewSignUp';

//Practitioner
import Dashboard from './components/practitioner/dashboard/Dashboard';
import EditMode from './components/practitioner/editmode/EditMode';
import Appointment from './components/practitioner/appointment/Appointment';
import YourPatient from './components/practitioner/appointment/YourPatient';
import NewPatient from './components/practitioner/appointment/NewPatient';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path='/patient/all' element={<Appointment/>}></Route>
      <Route path='/patient/accept/:id' element={<YourPatient/>}></Route>
        <Route path={'/'} element={<LandingPage/>}></Route>
        <Route path={'/medapp/signup'} element={<NewSignUp/>}> </Route>
        <Route path={"/practitioner/dashboard"}element={<Dashboard/>}/>
        <Route path={"/practitioner/dashboard/edit/:uid/:index"}element={<EditMode/>}/>  
      </Routes>
    </BrowserRouter>

    <Appointment/>



    </>
  );
}

  
export default App;
