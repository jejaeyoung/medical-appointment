import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';

import SidebarMenu from "../sidebar/SidebarMenu";
import Nav from 'react-bootstrap/Nav';


const MedicalRecord = () => {
    const { did } = useParams();
    const [allAppointments, setAllAppointments] = useState([]);
    const [theId, setTheId] = useState("");
    const [theName, setTheName] = useState("");
    const [theImage, setTheImage] = useState("");
    const [activeTab, setActiveTab] = useState("upcoming");
    const defaultImage = "images/NoProfile.jpg";
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
        <>
          <div style={{display: "flex", flex: "1 0 auto", height: "100vh",overflowY: "hidden",}}>
            <SidebarMenu doctor_image={theImage}doctor_name={theName} did={theId} />

            <div style={{ padding: "20px", overflowY: "auto", overflowX: "hidden" }} className="container1 container-fluid ">
              <h1 className="removegutter dashboard-title">Medical Records</h1>
                <div style={{paddingLeft:'30px', paddingRight:'30px'}}>
                    This is medical records
                </div>

              
            

            </div>
             
          </div>
    </>
      </>
    );
  };
  

  

export default MedicalRecord;
