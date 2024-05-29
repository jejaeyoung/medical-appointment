import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import './Appointment.css';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
const TodaysAppointment = () => {
  const { did } = useParams();
  const [allAppointments, setAllAppointments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [theId, setTheId] = useState("");
  const [theName, setTheName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/doctor/api/finduser/${did}`)
      .then((res) => {
        setTheId(res.data.theDoctor._id);
        setTheName(res.data.theDoctor.dr_firstName);
      })
      .catch((err) => {
        setError("Error fetching doctor details");
        console.log(err);
      });

    axios
      .get(`http://localhost:8000/doctor/appointments/${did}`)
      .then((res) => {
        setAllAppointments(res.data);
      })
      .catch((err) => {
        setError("Error fetching appointments");
        console.log(err);
      });
  }, [did]);

  const completeAppointment = (appointmentID) => {
    const newStatus = {
        status: 'Completed'
    };
    axios.put(`http://localhost:8000/doctor/api/${appointmentID}/completeappointment`, newStatus)
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

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayDate = getTodayDate();

  // Filter appointments to get only today's appointments
  const todaysAppointments = allAppointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date).toISOString().split('T')[0];
    return appointmentDate === todayDate;
  });

  return (
    <>
      <div>
        <div style={{ padding:'30px', width: '100%' }}>
          <h1>Today's Appointments</h1>
          <Table striped bordered hover variant ="blue">
            <thead>
              <tr>
                <th style={{border: "1px solid #00000018"}}>Patient ID</th>
                <th style={{border: "1px solid #00000018"}}>Appointment ID</th>
                <th style={{border: "1px solid #00000018"}}>Patient Name</th>
                <th style={{border: "1px solid #00000018"}}>Date</th>
                <th style={{border: "1px solid #00000018"}}>Time</th>
                <th style={{border: "1px solid #00000018"}}>Reason</th>
                <th style={{border: "1px solid #00000018"}}>Status</th>
                <th style={{border: "1px solid #00000018"}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todaysAppointments
                .filter(appointment => appointment.status === 'Scheduled')
                .map((appointment,index) => {
                const patient = appointment.patient;
               
                const patientName = `${patient.patient_firstName} ${patient.patient_middleInitial}. ${patient.patient_lastName}`;
                return (
                  <tr key={appointment._id}>
                    <td>{appointment.patient.patient_ID}</td>
                    <td>{appointment._id}</td>
                    <td>{patientName}</td>
                    <td>{new Date(appointment.date).toLocaleDateString()}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.reason}</td>
                    <td>{appointment.status}</td>
                    <td>
                      {/* Add any actions you need here */}
              
                      <Button onClick={() => completeAppointment(appointment._id)}>Complete</Button>
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
