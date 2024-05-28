// Appointments.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import axios from "axios";
import PatientNavBar from "../PatientNavBar/PatientNavBar";
import CancelModal from "../scheduledappointment/Modal/CancelModal";
import './Appointment.css';

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
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

    const handleCancelClick = (appointment) => {
        setSelectedAppointment(appointment);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedAppointment(null);
    };

    const handleConfirmCancellation = (cancelReason) => {
        if (!selectedAppointment) return;

        const updatedStatus = {
            status: 'Cancelled'
        };

        axios.put(`http://localhost:8000/patient/api/${selectedAppointment._id}/updateappointment`, { cancelReason: cancelReason })
            .then((response) => {
                console.log(response.data);
           
                setAppointments(prevAppointments => 
                    prevAppointments.map(appointment => 
                        appointment._id === selectedAppointment._id ? { ...appointment, status: 'Cancelled', cancelReason: cancelReason } : appointment
                    )
                );
                
                handleCloseModal();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
        <div className='mainContainer'>

   
           {appointments
                .filter(appointment => appointment.status === 'Scheduled')
                .map((appointment, index) => (
                    <div className="aContainer" key={index}>
                        <p>Your Doctor is: {appointment.doctor.dr_firstName} {appointment.doctor.dr_middleInitial} {appointment.doctor.dr_lastName}</p>
                        <p>Status: {appointment.status}</p>
                        <p>Date/Time: {appointment.date}/{appointment.time}</p>
                        <Button onClick={() => handleCancelClick(appointment)}>Cancel the Appointment</Button>
                    </div>
                ))
           }

</div>
           <CancelModal 
               show={showModal} 
               handleClose={handleCloseModal} 
               handleConfirm={handleConfirmCancellation} 
           />
        </>
    );
}

export default Appointments;