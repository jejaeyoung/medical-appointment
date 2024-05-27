import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from "axios";
import { useState, useEffect } from "react";

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
        };

        axios.post(`http://localhost:8000/patient/api/${pid}/createappointment`, appointmentField)
            .then((response) => {
                console.log(response);
                window.alert("Created an appointment!");
                navigate(`/homepage/${pid}`);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const todayDate = getTodayDate();

    return (
        <>
            <Form>
                <Row>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control 
                            type="date" 
                            placeholder="Enter Date" 
                            min={todayDate} 
                            value={date}
                            onChange={(e) => setDate(e.target.value)} 
                        />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Time</Form.Label>
                        <Form.Control 
                            type="time" 
                            placeholder="Enter Time" 
                            value={time}
                            onChange={(e) => setTime(e.target.value)} 
                        />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Reason</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter Reason" 
                            value={reason}
                            onChange={(e) => setReason(e.target.value)} 
                        />
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
