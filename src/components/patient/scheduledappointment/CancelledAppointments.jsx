import { useNavigate, useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState,  } from "react";
import PatientNavBar from "../PatientNavBar/PatientNavBar";
import './Appointment.css'
function CancelledAppointments() {
    const [cancelledAppointments, setCancelledAppointments] = useState([]);
    const { pid } = useParams(); 
    
    useEffect(() => {
        axios.get(`http://localhost:8000/patient/api/onepatient/${pid}`)
            .then((res) => {
                const cancelledAppointments = res.data.thePatient.patient_appointments.filter(appointment => appointment.status === 'Cancelled');
                setCancelledAppointments(cancelledAppointments);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [pid]);

    return (
        <>
          {cancelledAppointments.map((appointment, index) => {
            return (
                <div className="aContainer" key={index}>
                    <p>Your Doctor is: {appointment.doctor.dr_firstName} {appointment.doctor.dr_middleInitial} {appointment.doctor.dr_lastName} </p>
                    <p>Status: {appointment.status} </p>
                    <p>Reason for Cancellation: {appointment.cancelReason} </p>
                    <p>Date/Time: {appointment.date}/{appointment.time} </p>
                </div>
            )
          })}
        </>
    );
}

export default CancelledAppointments;
