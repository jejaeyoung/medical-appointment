import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import './Appointment.css';

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
            const doctor = appointment?.doctor;
            return (
                <div className="aContainer" key={index}>
                    <p>Your Doctor is: {doctor ? `${doctor.dr_firstName} ${doctor.dr_middleInitial || ''} ${doctor.dr_lastName}` : 'Doctor information not available'}</p>
                    <p>Status: {appointment.status}</p>
                    <p>Reason for Cancellation: {appointment.cancelReason}</p>
                    <p>Date/Time: {appointment.date}/{appointment.time}</p>
                </div>
            );
          })}
        </>
    );
}

export default CancelledAppointments;
