import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


//Component
import LandingPage from './components/landpage/LandingPage';
import LogInUser from './components/login/LogInUser';
import NewSignUp from './components/login/NewSignUp';
import VerifyOTP from './components/login/VerifyOTP';

//Practitioner
import Dashboard from './components/practitioner/dashboard/Dashboard';
import EditMode from './components/practitioner/editmode/EditMode';
import TheAppointments from './components/practitioner/appointment/TheAppointmentsNav';


import AccountInfo from './components/practitioner/accountinfo/AccountInfo';
import MainMedicalRecord from './components/practitioner/medicalrecord/MainMedicalRecord';
import DoctorProfile from './components/patient/doctorprofile/DoctorProfile';
import PendingAppointment from './components/practitioner/appointment/TheAppointmentsNav';

//Patient
import HomePagePatient from './components/patient/homepage/HomePagePatient';
import ChooseDoctor from './components/patient/choosedoctor/choosedoctor';

import MyAppointment from './components/patient/scheduledappointment/MyAppointment';
import MainPatientInformation from './components/patient/patientinformation/MainPatientInformation';
import DoctorInformation from './components/practitioner/accountinfo/DoctorInformation';
import ChooseDoctorSpecialization from './components/patient/choosedoctor/ChooseDoctorSpecialization';
import MainInformation from './components/practitioner/patientinformation/MainInformation';








function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>

          <Route path={'/'} element={<LandingPage/>}></Route>
          <Route path={'/medapp/signup'} element={<NewSignUp/>}> </Route>
          <Route path={'/medapp/login'} element={<LogInUser/>}> </Route>
          <Route path={'/verify-otp'} element={<VerifyOTP/>}> </Route>
        {/* Practitioner Routes */}
          <Route path={"/dashboard/:did"} element={<Dashboard />}/>
          <Route path={"/dashboard/edit/:uid/:index"}element={<EditMode/>}/>  
          <Route path={'/mainappointment/:did'} element={<TheAppointments/>}></Route>
          <Route path={'/medicalrecord/:did'} element={<MainMedicalRecord/>}/>
          <Route path={"/information/:pid/:did/:apid"} element={<MainInformation />}/>
          <Route path={"/account/:did"} element={<DoctorInformation />}/>
        
        {/* Patient Routes */}
          <Route path={"/homepage/:pid"} element={<HomePagePatient />}/>
          <Route path={"/choosedoctor/:pid"} element={<ChooseDoctor />}/>
          <Route path={"/:specialty/choosedoctor/:pid"} element={<ChooseDoctorSpecialization />} />
          <Route path={"/doctorprofile/:pid/:did"} element={<DoctorProfile />}/>
          <Route path={"/myappointment/:pid"} element={<MyAppointment />}/>
          <Route path={"/accinfo/:pid"} element={<MainPatientInformation />}/>

      </Routes>
    </BrowserRouter>


    

  



    </>
  );
}

  
export default App;
