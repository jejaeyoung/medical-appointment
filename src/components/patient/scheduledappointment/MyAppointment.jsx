import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState,  } from "react";
import PatientNavBar from "../PatientNavBar/PatientNavBar";
import './Appointment.css'
import ActiveAppointment from "./Appointments";
import CancelledAppointments from "./CancelledAppointments";
import CompleteAppointment from "./CompleteAppointment";
import PendingAppointments from "./PendingAppointment";
import RescheduledAppointment from "./RescheduledAppointments";



function MyAppointment() {
    const [theDoctor, setAllDoctor] = useState([]);
    const [theDocId, setAllDocId] = useState([]);
    const { pid } = useParams(); 
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("pending");
   
    const handleTabPending = (tab) => {
      setActiveTab(tab)
    }
    return (
        <>
          <PatientNavBar/>

          <div className="ma-container">
            <div className="ma-container1">
              <Nav fill variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link onClick={() => setActiveTab("pending")}>Pending Appointments</Nav.Link>
                  </Nav.Item>
                 <Nav.Item>
                    <Nav.Link onClick={() => setActiveTab("active")}>Scheduled Appointments</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={() => setActiveTab("cancel")}>Cancelled Appointments</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={() => setActiveTab("completed")}>Completed Appointment</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={() => setActiveTab("rescheduled")}>Rescheduled Appointment</Nav.Link>
                  </Nav.Item>
                  
              </Nav>
            </div>
           
          </div>
              {activeTab === "pending" && <PendingAppointments activeTab = {handleTabPending} />}
              {activeTab === "active" && <ActiveAppointment />}
              {activeTab === "cancel" && <CancelledAppointments />}
              {activeTab === "completed" && <CompleteAppointment />}
              {activeTab === "rescheduled" && <RescheduledAppointment />}
       
         

           
           

          
        </>
    );
}

export default MyAppointment;
