import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import './Appointment.css';
import SidebarMenu from "../sidebar/SidebarMenu";
import Nav from 'react-bootstrap/Nav';

import TodaysAppointment from "./TodaysAppointment";
import UpcomingAppointment from "./UpcomingAppointment";

const MainAppointment = () => {
    const { did } = useParams();
    const [allAppointments, setAllAppointments] = useState([]);
    const [theId, setTheId] = useState("");
    const [theName, setTheName] = useState("");
    const [activeTab, setActiveTab] = useState("upcoming");
  
    useEffect(() => {
      axios
        .get(`http://localhost:8000/doctor/api/finduser/` + did)
        .then((res) => {
          setTheId(res.data.theDoctor._id);
          setTheName(res.data.theDoctor.dr_firstName);
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
        <div style={{ display: "flex", flex: "1 0 auto", height: "100vh", overflowY: "hidden", }}>
          <SidebarMenu doctor_name={theName} did={theId} />
  
          <div style={{padding: "30px"}}>
            <Nav fill variant="tabs" defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link onClick={() => setActiveTab("upcoming")}>Upcoming Appointment</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => setActiveTab("todays")}>Today's Appointment</Nav.Link>
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

            <div>
            {activeTab === "upcoming" && <UpcomingAppointment />}
            {activeTab === "todays" && <TodaysAppointment />}
            {/* {activeTab === "completed" && <CompletedAppointment />} */}
          </div>
          </div>
  
         
        </div>
      </>
    );
  };
  

  

export default MainAppointment;
