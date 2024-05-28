import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState,  } from "react";
import PatientNavBar from "../PatientNavBar/PatientNavBar";
import './Appointment.css'
import ActiveAppointment from "./Appointments";
import CancelledAppointments from "./CancelledAppointments";
import CompleteAppointment from "./CompleteAppointment";

function MyAppointment() {
    const [theDoctor, setAllDoctor] = useState([]);
    const [theDocId, setAllDocId] = useState([]);
    const { pid } = useParams(); 
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("active");
   

    return (
        <>
            <PatientNavBar/>

            <Nav fill variant="tabs" defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link onClick={() => setActiveTab("active")}>Scheduled Appointments</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => setActiveTab("cancel")}>Cancelled Appointment</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => setActiveTab("completed")}>Completed Appointment</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                  Disabled
                </Nav.Link>
              </Nav.Item>
            </Nav>
      
              {activeTab === "active" && <ActiveAppointment />}
              {activeTab === "cancel" && <CancelledAppointments />}
              {activeTab === "completed" && <CompleteAppointment />}
       
           

          
        </>
    );
}

export default MyAppointment;
