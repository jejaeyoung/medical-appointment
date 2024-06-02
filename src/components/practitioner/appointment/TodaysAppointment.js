import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import PrescriptionModal from './PrescriptionModal';
import './Appointment.css';

const TodaysAppointment = () => {
  const { did } = useParams();
  const [allAppointments, setAllAppointments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [theId, setTheId] = useState("");
  const [theName, setTheName] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState("");

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
    window.location.reload();
    axios.put(`http://localhost:8000/doctor/api/${appointmentID}/completeappointment`, newStatus)
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

  const handleCreatePrescription = (patientId, appointmentId) => {
    setSelectedPatientId(patientId);
    setSelectedAppointmentId(appointmentId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayDate = getTodayDate();

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
                      <div>
                        <Button onClick={() => handleCreatePrescription(appointment.patient._id, appointment._id)}>Create Prescription</Button>
                        <Button onClick={() => completeAppointment(appointment._id)}>Complete</Button>
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
      <PrescriptionModal
        show={showModal}
        handleClose={handleCloseModal}
        patientId={selectedPatientId}
        appointmentId={selectedAppointmentId}
        doctorId={did}
      />
    </>
  );
};

export default TodaysAppointment;