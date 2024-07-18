import { useNavigate, useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button, Navbar, Nav, Form } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState } from "react";


import PatientNavBar from "../PatientNavBar/PatientNavBar";
import PatientInformationSidebar from "./Sidebar/PatientInformationSidebar";
import { Scrollbars } from 'react-custom-scrollbars';

function MainPatientInformation() {
    
    const { pid } = useParams(); 
    const navigate = useNavigate();
    const defaultImage = "images/NoProfile.jpg";
    const [thePatient, setThePatient] = useState();
    const [showModal, setShowModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);


    const [theId, setTheId] = useState("");
    const [theName, setTheName] = useState("");
    const [theImage, setTheImage] = useState("");
    const [theLastName, setTheLastName] = useState("");
    const [theMI, setTheMI] = useState("");
    const [email, setEmail] = useState("");
    const [cnumber, setCnumber] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8000/patient/api/onepatient/${pid}`)
            .then((res) => {
              
                setThePatient(res.data.thePatient);
                setTheName(res.data.thePatient.patient_firstName)
                setTheLastName(res.data.thePatient.patient_lastName)
                setTheMI(res.data.thePatient.patient_middleInitial)
                setEmail(res.data.thePatient.patient_email)
                setCnumber(res.data.thePatient.patient_contactNumber)
                setDob(res.data.thePatient.patient_dob)
                setPassword(res.data.thePatient.patient_password)
        
                
            })
            .catch((err) => {
                console.log(err);
            });
    }, [pid]);

  
 
    return (
        <>

         <Scrollbars style={{ width: '100%', height: '100%' }} className="pp-scrollbar">
            <PatientNavBar/>
            <PatientInformationSidebar pid={pid}/>
            </Scrollbars>
      
            

      
     
       
          
         

           
        </>
    );
}

export default MainPatientInformation;
