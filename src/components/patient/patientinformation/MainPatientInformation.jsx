import {  useParams  } from "react-router-dom";



import PatientNavBar from "../PatientNavBar/PatientNavBar";
import PatientInformationSidebar from "./Sidebar/PatientInformationSidebar";
import { Scrollbars } from 'react-custom-scrollbars';

function MainPatientInformation() {
    
    const { pid } = useParams(); 

  
 
    return (
        <>
                <PatientNavBar/>
                <PatientInformationSidebar pid={pid}/>    
        </>
    );
}

export default MainPatientInformation;
