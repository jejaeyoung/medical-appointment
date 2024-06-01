import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState,  } from "react";
import './DoctorProfile.css'
import PatientNavBar from "../PatientNavBar/PatientNavBar";

function DoctorProfile() {
    const [theDoctors, setAllDoctors] = useState([]);
    const [theDocId, setAllDocId] = useState([]);
    const { pid, did} = useParams(); 
    const navigate = useNavigate();
    const defaultImage = "images/NoProfile.jpg";
    // Display all the available doctors and able to direct to appointment form and pass it through the frontend.
    useEffect(() => {
        axios.get(`http://localhost:8000/doctor/api/alldoctor`)
            .then((res) => {
                console.log(res.data.theDoctor); // Log the response data
                setAllDoctors(res.data.theDoctor); // Set state to the data property of the response
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleDoctorClick = (did) => {
        navigate(`/appointment/${pid}/${did}`); // Navigate to appointment page with uid and doctorId
    };

    return (
        <>
            <PatientNavBar/>


            <div className="dp-main">
                <div className="dp-card">
                    
                </div>
            </div>
            
           
        </>
    );
}

export default DoctorProfile;
