import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


//Component
import LandingPage from './components/landpage/LandingPage';
import LogInUser from './components/login/LogInUser';
import NewSignUp from './components/login/NewSignUp';


//Practitioner
import Dashboard from './components/practitioner/dashboard/Dashboard';
import EditMode from './components/practitioner/editmode/EditMode';
import Appointment from './components/practitioner/appointment/Appointment';
import YourPatient from './components/practitioner/appointment/YourPatient';
import NewPatient from './components/practitioner/appointment/NewPatient';

//Patient
import HomePagePatient from './components/patient/homepage/HomePagePatient';
import ChooseDoctor from './components/patient/choosedoctor/choosedoctor';
import CreateAppointment from './components/patient/appointmentform/CreateAppointment';
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>

        <Route path={'/'} element={<LandingPage/>}></Route>
        <Route path={'/medapp/signup'} element={<NewSignUp/>}> </Route>
        <Route path={'/medapp/login'} element={<LogInUser/>}> </Route>
        {/* Practitioner Routes */}
        <Route path={"/dashboard/:uid"} element={<Dashboard />}/>
        <Route path={"/dashboard/edit/:uid/:index"}element={<EditMode/>}/>  
        <Route path={'/practitioner/patient/all'} element={<Appointment/>}></Route>
        <Route path={'/practitioner/patient/accept/:id'} element={<YourPatient/>}></Route>
        {/* Patient Routes */}
        <Route path={"/homepage/:pid"} element={<HomePagePatient />}/>
        <Route path={"/choosedoctor/:pid"} element={<ChooseDoctor />}/>
        <Route path={"/appointment/:pid/:did"} element={<CreateAppointment />}/>
      </Routes>
    </BrowserRouter>


    

  



    </>
  );
}

  
export default App;
