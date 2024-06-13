import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';

import './Appointment.css';


const TodaysAppointment = () => {
  const { did } = useParams();
  const [allAppointments, setAllAppointments] = useState([]);
  const [appointments, setAppointments] = useState([]);

  
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [selectedAppointmentId, setSelectedAppointmentId] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/doctor/appointments/${did}`)
      .then((res) => {

        setAllAppointments(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setError("Error fetching appointments");
        console.log(err);
      });
  }, [did]);




  const acceptAppointment = (appointmentID) => {
    const newStatus = {
        status: 'Scheduled'
    };
    window.location.reload();
    axios.put(`http://localhost:8000/doctor/api/${appointmentID}/acceptpatient`, newStatus)
        .then((response) => {
            console.log(response.data);
            setAppointments(prevAppointments => 
                prevAppointments.map(appointment => 
                    appointment._id === appointmentID ? { ...appointment, status: 'Completed' } : appointment
                )
            );
        })
        .catch((err) => {
            console.log(err);
        });
  }

  





 

  return (
    <>
      <div>
        <div style={{ padding:'30px', width: '100%' }}>
          <h1>Pending Appointments</h1>
          <Table striped bordered hover variant ="blue">
            <thead>
              <tr>
                {/* <th style={{border: "1px solid #00000018"}}>Patient ID</th> */}
           
                <th style={{border: "1px solid #00000018"}}>Patient Name</th>
                <th style={{border: "1px solid #00000018"}}>Date</th>
                <th style={{border: "1px solid #00000018"}}>Time</th>
                <th style={{border: "1px solid #00000018"}}>Reason</th>
                <th style={{border: "1px solid #00000018"}}>Status</th>
                <th style={{border: "1px solid #00000018"}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allAppointments
                .filter(appointment => appointment.status === 'Pending')
                .map((appointment,index) => {
                  console.log(appointment);
                const patient = appointment.patient;
                const patientName = `${patient.patient_firstName} ${patient.patient_middleInitial}. ${patient.patient_lastName}`;
                return (
                  <tr key={appointment._id}>
                    {/* <td>{appointment.patient.patient_ID}</td> */}
                   
                    <td>{patientName}</td>
                    <td>{new Date(appointment.date).toLocaleDateString()}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.reason}</td>
                    <td>{appointment.status}</td>
                    <td>
                      <div>
                        
                        <Button onClick={() => acceptAppointment(appointment._id)}>Accept</Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {error && <p>{error}</p>}
        </div>
      </div>
  
    </>
  );
};

export default TodaysAppointment;