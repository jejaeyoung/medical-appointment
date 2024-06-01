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
import MainAppointment from './components/practitioner/appointment/MainAppointment';
import AccountInfo from './components/practitioner/accountinfo/AccountInfo';
import MedicalRecord from './components/practitioner/medicalrecord/MedicalRecord';
import DoctorProfile from './components/patient/doctorprofile/DoctorProfile';

//Patient
import HomePagePatient from './components/patient/homepage/HomePagePatient';
import ChooseDoctor from './components/patient/choosedoctor/choosedoctor';
import CreateAppointment from './components/patient/appointmentform/CreateAppointment';
import MyAppointment from './components/patient/scheduledappointment/MyAppointment';
import { Upload } from 'react-bootstrap-icons';





function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>

          <Route path={'/'} element={<LandingPage/>}></Route>
          <Route path={'/medapp/signup'} element={<NewSignUp/>}> </Route>
          <Route path={'/medapp/login'} element={<LogInUser/>}> </Route>
        {/* Practitioner Routes */}
          <Route path={"/dashboard/:did"} element={<Dashboard />}/>
          <Route path={"/dashboard/edit/:uid/:index"}element={<EditMode/>}/>  
          <Route path={'/mainappointment/:did'} element={<MainAppointment/>}></Route>
          <Route path={'/medicalrecord/:did'} element={<MedicalRecord/>}/>
          <Route path={"/account/:did"} element={<AccountInfo />}/>
        
        {/* Patient Routes */}
          <Route path={"/homepage/:pid"} element={<HomePagePatient />}/>
          <Route path={"/choosedoctor/:pid"} element={<ChooseDoctor />}/>
          <Route path={"/doctorprofile/:pid/:did"} element={<DoctorProfile />}/>
          <Route path={"/appointment/:pid/:did"} element={<CreateAppointment />}/>
          <Route path={"/myappointment/:pid"} element={<MyAppointment />}/>

          
      </Routes>
    </BrowserRouter>


    

  



    </>
  );
}

  
export default App;
