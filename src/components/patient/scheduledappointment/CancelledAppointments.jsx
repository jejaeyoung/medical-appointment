import { useNavigate, useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState,  } from "react";
import PatientNavBar from "../PatientNavBar/PatientNavBar";
import './Appointment.css'
function CancelledAppointments() {
    const [theDoctor, setAllDoctor] = useState([]);
    const [theDocId, setAllDocId] = useState([]);
    const [appointmentID, setAppointmentID] = useState("");
    const { pid } = useParams(); 
    const navigate = useNavigate();
   
    useEffect(() => {
        axios.get(`http://localhost:8000/patient/api/onepatient/${pid}`)
            .then((res) => {
                
                setAllDoctor(res.data.thePatient.patient_appointments);
                console.log(res.data.thePatient);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


 
    return (
        <>
          {theDoctor
            .filter(appointment => appointment.status === 'Cancelled')
            .map((doctor,index)=>{
            return (
                <div className="aContainer" key={index}>
                    <p>Your Doctor is: {doctor.doctor.dr_firstName} {doctor.doctor.dr_middleInitial} {doctor.doctor.dr_lastName} </p>
                    <p> Status: {doctor.status} </p>
                    <p> Date/Time: {doctor.date}/{doctor.time} </p>
                   
                </div>
            )
           })}
        </>
    );
}

export default CancelledAppointments;
