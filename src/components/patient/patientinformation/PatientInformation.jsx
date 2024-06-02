import { useNavigate, useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button, Navbar, Nav, Form } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState } from "react";
import PatientNavBar from "../PatientNavBar/PatientNavBar";
import './PatientInformation.css'


function PatientInformation() {
    
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
                console.log(res.data.thePatient);
                
            })
            .catch((err) => {
                console.log(err);
            });
    }, [pid]);

  
 
    return (
        <>
           <PatientNavBar/>
           <div className="pi-main">
                <h1>Patient Account Details</h1>
           </div>
          
           <div className="pi-container">
               
                        
            <div className="pi-container2">

           
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>First Name:</Form.Label>
                <Form.Control value={theName} disabled />
              </Form.Group>
              <div className="justify-content-end">
                <Row>
                  <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control value={theLastName} disabled />
                  </Form.Group>
                  <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                    <Form.Label>Middle Initial:</Form.Label>
                    <Form.Control value={theMI} disabled /> 
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control value={email} disabled />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                    <Form.Label>Birthdate:</Form.Label>
                    <Form.Control value={new Date(dob).toLocaleDateString()} disabled />
                  </Form.Group>
                  <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                    <Form.Label>Contact Number:</Form.Label>
                    <Form.Control value={cnumber} disabled /> 
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" value={password} disabled /> 
                  </Form.Group>
                </Row>
              </div>
              <div style={{textAlign: "center", marginTop: '20px'}}>
                {/* <Button variant="primary" onClick={() => setIsUpdateModalOpen(true)}>
                  Update your Information
                </Button> */}
              </div>
            </Form>
            </div>
          </div>
        </>
    );
}

export default PatientInformation;
