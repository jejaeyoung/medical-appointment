import { useNavigate, useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState } from "react";
import PatientNavBar from "../PatientNavBar/PatientNavBar";
import './Appointment.css';

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const { pid } = useParams(); 
    const navigate = useNavigate();
   
    useEffect(() => {
        axios.get(`http://localhost:8000/patient/api/onepatient/${pid}`)
            .then((res) => {
                setAppointments(res.data.thePatient.patient_appointments);
                console.log(res.data.thePatient.patient_appointments);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [pid]);

    const cancelAppointment = (appointmentID) => {
        const newStatus = {
            status: 'Cancelled'
        };
        axios.put(`http://localhost:8000/patient/api/${appointmentID}/updateappointment`, newStatus)
            .then((response) => {
                console.log(response.data);
                setAppointments(prevAppointments => 
                    prevAppointments.map(appointment => 
                        appointment._id === appointmentID ? { ...appointment, status: 'Cancelled' } : appointment
                    )
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
           {appointments
                .filter(appointment => appointment.status === 'Scheduled')
                .map((appointment, index) => (
                    <div className="aContainer" key={index}>
                        <p>Your Doctor is: {appointment.doctor.dr_firstName} {appointment.doctor.dr_middleInitial} {appointment.doctor.dr_lastName}</p>
                        <p>Status: {appointment.status}</p>
                        <p>Date/Time: {appointment.date}/{appointment.time}</p>
                        <Button onClick={() => cancelAppointment(appointment._id)}>Cancel the Appointment</Button>
                    </div>
                ))
           }
        </>
    );
}

export default Appointments;
