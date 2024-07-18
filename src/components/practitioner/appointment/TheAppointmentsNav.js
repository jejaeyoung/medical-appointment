import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import './Appointment.css';
import SidebarMenu from "../sidebar/SidebarMenu";
import Nav from 'react-bootstrap/Nav';



import MainAppointment from "./MyPatientsNav";
import MyPendingAppointment from "./MyPendingAppointment";


const TheAppointmentsNav = () => {
    const { did } = useParams();
    const [allAppointments, setAllAppointments] = useState([]);
    const [theId, setTheId] = useState("");
    const [theName, setTheName] = useState("");
    const [theImage, setTheImage] = useState("");
    const [activeTab, setActiveTab] = useState("pending");
    const defaultImage = "images/014ef2f860e8e56b27d4a3267e0a193a.jpg";
    useEffect(() => {
      axios
        .get(`http://localhost:8000/doctor/api/finduser/` + did)
        .then((res) => {
          setTheId(res.data.theDoctor._id);
          setTheName(res.data.theDoctor.dr_firstName);
          setTheImage(res.data.theDoctor.dr_image || defaultImage)
        })
        .catch((err) => {
          console.log(err);
        });
  
      axios
        .get(`http://localhost:8000/doctor/appointments/` + did)
        .then((res) => {
          setAllAppointments(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [did]);
  
    return (
      <>
        <div>
        
        <div style={{display: "flex", flex: "1 0 auto", height: "100vh",overflowY: "hidden",}}>
       
                <SidebarMenu doctor_image={theImage}doctor_name={theName} did={theId} />
         
            <div className="pa-container"> 
                <Nav fill variant="tabs" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link onClick={() => setActiveTab("pending")}>Pending Appointments</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => setActiveTab("mypatients")}>My Patients</Nav.Link>
                    </Nav.Item>
                </Nav>
                {activeTab === 'pending' && <MyPendingAppointment/>}
                {activeTab === 'mypatients' && <MainAppointment/>}
            </div>
                
              

        </div>
             
             
    
    </div>
      </>
    );
  };
  

  

export default TheAppointmentsNav;
