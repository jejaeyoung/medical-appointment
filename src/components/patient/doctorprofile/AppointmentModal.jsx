import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import axios from "axios";
import { useState, useEffect } from "react";
import './DoctorProfile.css';

function AppointmentModal({ show, handleClose, pid, did }) {
    const navigate = useNavigate();
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [reason, setReason] = useState("");
    const [medium, setMedium] = useState("Online");
    const [payment, setPayment] = useState("Cash");
    const [cancelReason, setCancelReason] = useState("");
    const [prescription, setPrescription] = useState("");
    const [availableTimes, setAvailableTimes] = useState([]);

    const createAppointment = () => {
        if (!time) {
            window.alert("Please select a valid time for the appointment.");
            return;
        }
    
        const appointmentField = {
            doctorId: did,
            prescription: prescription,
            date: date,
            time: time,
            reason: reason,
            medium: medium,
            payment: payment,
            cancelReason: cancelReason,
        };
    
        axios.post(`http://localhost:8000/patient/api/${pid}/createappointment`, appointmentField)
            .then((response) => {
                window.alert("Created an appointment!");
                navigate(`/myappointment/${pid}`);
            })
            .catch((err) => {
                console.log(err.response.data); // Log the error response data
                window.alert(`Error: ${err.response.data.message}`); // Show the error message to the user
            });
    };
    

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getAvailableTimes = (day) => {
        const morningTimes = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"];
        const afternoonTimes = {
            1: ["02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"], // Monday
            3: ["02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"], // Wednesday
            5: ["02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"], // Friday
            2: ["04:00 PM", "04:30 PM"], // Tuesday
            4: ["04:00 PM", "04:30 PM"], // Thursday
            6: ["04:00 PM", "04:30 PM"], // Saturday
            0: ["02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"], // Saturday
        };
        return morningTimes.concat(afternoonTimes[day] || []);
    };

    useEffect(() => {
        if (date) {
            const selectedDate = new Date(date);
            const day = selectedDate.getDay();
            setAvailableTimes(getAvailableTimes(day));
        } else {
            setAvailableTimes([]);
        }
    }, [date]);

    const todayDate = getTodayDate();

    return (
        <Modal show={show} onHide={handleClose} className='am-overlay'>
            <div className="am-content">
                <Modal.Header className="am-header" closeButton>
                    <Modal.Title>Book Appointment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                                    as="select"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    disabled={!availableTimes.length}
                                >
                                    <option value="">Select a time</option>
                                    {availableTimes.map((timeSlot, index) => (
                                        <option key={index} value={timeSlot}>
                                            {timeSlot}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Medium</Form.Label>
                                <Form.Check
                                    type="radio"
                                    label="Online"
                                    name="medium"
                                    checked={medium === "Online"}
                                    onChange={() => setMedium("Online")}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Face to Face"
                                    name="medium"
                                    checked={medium === "Face to Face"}
                                    onChange={() => setMedium("Face to Face")}
                                />
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Payment</Form.Label>
                                <Form.Check
                                    type="radio"
                                    label="Cash"
                                    name="payment"
                                    checked={payment === "Cash"}
                                    onChange={() => setPayment("Cash")}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Online Payment"
                                    name="payment"
                                    checked={payment === "Online Payment"}
                                    onChange={() => setPayment("Online Payment")}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 am-textarea">
                                <Form.Label>Reason</Form.Label>
                                <Form.Control
                                    type="text"
                                    as='textarea'
                                    className="am-textarea"
                                    placeholder="Enter Reason"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Upload File</Form.Label>
                                <Form.Control
                                    type="file"
                                />
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={createAppointment} variant="primary" type="button">
                        Submit
                    </Button>
                </Modal.Footer>
            </div>
        </Modal>
    );
}

export default AppointmentModal;
