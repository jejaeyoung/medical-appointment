import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState } from "react";

function CreateAppointment() {
    const navigate = useNavigate();
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [reason, setReason] = useState("");
    const { pid, did } = useParams();

    const createAppointment = () => {
        const appointmentField = {
            doctorId: did,
            date: date,
            time: time,
            reason: reason
        }

        axios.post(`http://localhost:8000/patient/api/${pid}/createappointment`, appointmentField)
        .then((response) => {
            console.log(response);
            window.alert("Created an appointment!");
            navigate(`/homepage/${pid}`);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
        <Form>
            <Row>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter Date" onChange={(e) => setDate(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Time</Form.Label>
                    <Form.Control type="time" placeholder="Enter Time" onChange={(e) => setTime(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Reason</Form.Label>
                    <Form.Control type="text" placeholder="Enter Reason" onChange={(e) => setReason(e.target.value)} />
                </Form.Group>
            </Row>

            <Button onClick={createAppointment} variant="primary" type="button">
                Submit
            </Button>
        </Form>
        <p>Hello, this is Create Appointment</p>
        </>
    );
}

export default CreateAppointment;
