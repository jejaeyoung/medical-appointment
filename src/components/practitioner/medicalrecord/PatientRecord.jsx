import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, Table, Button } from 'react-bootstrap';

const PatientRecord = ({ patientId, onClose }) => {
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/patient/api/onepatient/${patientId}`)
            .then((res) => {
                console.log(res.data.thePatient);
                setPatient(res.data.thePatient);
            })
            .catch((err) => {
                console.error('Error fetching patient data:', err);
            });
    }, [patientId]);

    if (!patient) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: "20px", overflowY: "auto", overflowX: "hidden" }} className="container1 container-fluid">
        <div className="container mt-5">
            <Button variant="secondary" onClick={onClose}>Back to Medical Records</Button>
            <h1 className="text-center mb-4">Patient Record</h1>
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Personal Information</Card.Title>
                    <p><strong>ID:</strong> {patient.patient_ID}</p>
                    <p><strong>Name:</strong> {patient.patient_firstName} {patient.patient_middleInitial}. {patient.patient_lastName}</p>
                    <p><strong>Email:</strong> {patient.patient_email}</p>
                    <p><strong>Age:</strong> {patient.patient_age}</p>
                    <p><strong>Contact Number:</strong> {patient.patient_contactNumber}</p>
                    <p><strong>Gender:</strong> {patient.patient_gender}</p>
                </Card.Body>
            </Card>

            <h2>Appointments</h2>
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Doctor</th>
                        <th>Prescription</th>
                    </tr>
                </thead>
                <tbody>
                    {patient.patient_appointments.map((appointment, index) => (
                        <tr key={index}>
                            <td>{new Date(appointment.date).toLocaleDateString()}</td>
                            <td>{appointment.doctor ? `${appointment.doctor.dr_firstName} ${appointment.doctor.dr_lastName}` : 'Unknown Doctor'}</td>
                            <td>{appointment.prescription ? appointment.prescription.details : 'No prescription'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h2>Prescriptions</h2>
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Doctor</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {patient.prescriptions.map((prescription, index) => (
                        <tr key={index}>
                            <td>{new Date(prescription.createdAt).toLocaleDateString()}</td>
                            <td>{prescription.doctor ? `${prescription.doctor.dr_firstName} ${prescription.doctor.dr_lastName}` : 'Unknown Doctor'}</td>
                            <td>{prescription.details}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        </div>
    );
};

export default PatientRecord;
