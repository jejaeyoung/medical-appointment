import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Row, Form, Col, Button, Container, Modal } from 'react-bootstrap';
import './LogIn.css';
import NavigationalBar from '../landpage/navbar';

const LogInUser = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [userRole, setUserRole] = useState("Patient");
    const [show2FAModal, setShow2FAModal] = useState(false);
    const [userId, setUserId] = useState(null);
    const [twoFactorToken, setTwoFactorToken] = useState("");
    const [userSecretKey, setUserSecretKey] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (userRole === "Patient") {
                    response = await axios.get("http://localhost:8000/patient/api/allpatient");
                } else if (userRole === "Practitioner") {
                    response = await axios.get("http://localhost:8000/doctor/api/alldoctor");
                }

                if (response && response.data) {
                    const userData = response.data.thePatient || response.data.theDoctor;
                    setUsers(userData);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [userRole]);

    const loginuser = async (e) => {
        e.preventDefault();

        const user = users.find(user => user.patient_email === email || user.dr_email === email);
        console.log(user.twoFactorSecret);
        if (user && user.patient_password === password || user.dr_password === password) {
            if (userRole === 'Patient') {
                setUserId(user._id);
                setUserSecretKey(user.twoFactorSecret);
                if (user.twoFactorSecret) {
                    setShow2FAModal(true);
                } else if (!user.twoFactorSecret) {
                    window.alert("Successfully logged in");
                    navigate(`/homepage/${user._id}`);
                }
            } else if (userRole === 'Practitioner') {
                setUserId(user._id);
                setUserSecretKey(user.twoFactorSecret);
                if (user.twoFactorSecret) {
                    setShow2FAModal(true);
                } else if (!user.twoFactorSecret){
                    window.alert("Successfully logged in");
                    navigate(`/dashboard/${user._id}`);
                }
                
            } else {
                window.alert("Wrong Email or Password");
            }
        } else {
            window.alert("Wrong Email or Password");
        }
    };

    const handle2FAVerification = async () => {
        try {
          const response = await axios.post("http://localhost:8000/patient/api/verify-2fa", {
            userId,
            token: twoFactorToken.trim() // Ensure no leading/trailing spaces
          });
      
          if (response.data.verified && userRole === 'Patient') {
            window.alert("Successfully logged in");
            navigate(`/homepage/${userId}`);
            
          } else if (response.data.verified && userRole === 'Practitioner'){
                     window.alert("Successfully logged in");
                    navigate(`/dashboard/${userId}`);
          }
          
          else {
            console.log('Invalid 2FA token:', response.data.message);
            window.alert(response.data.message || "Invalid 2FA token");
          }
        } catch (error) {
          console.error('Error verifying 2FA token:', error);
          if (error.response && error.response.status === 400) {
            console.log('Error 400: Invalid 2FA token');
            window.alert("Invalid 2FA token. Please try again.");
          } else if (error.response && error.response.status === 500) {
            console.log('Error 500: Server-side error');
            window.alert("Error verifying 2FA token. Please try again later.");
          } else {
            console.log('Unknown error:', error);
            window.alert("Error verifying 2FA token. Please try again later.");
          }
        }
      };
      

    return (
        <>
            <NavigationalBar />
            <div className="align-items-center d-flex vh-100">
                <Container fluid className="maincontainer d-flex justify-content-center align-items-center">
                    <div className="container">
                        <h1>Welcome Back!</h1>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="align-items right">
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} controlId="formChoose">
                                    <Form.Label>Choose what to register:</Form.Label>
                                    <Form.Select value={userRole} onChange={(e) => setUserRole(e.target.value)} defaultValue="Choose">
                                        <option value="Patient">Patient</option>
                                        <option value="Practitioner">Practitioner</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3"></Row>
                            <div className="justify-content-center">
                                <Button type="submit" className="mb-2 buttonStyle" onClick={loginuser}>
                                    Log In
                                </Button>
                            </div>
                            <div className="mb-0">
                                <a href="/medapp/signup">No account yet? Sign up</a>
                            </div>
                        </Form>
                    </div>
                </Container>
            </div>

            <Modal show={show2FAModal} onHide={() => setShow2FAModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Two-Factor Authentication</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="form2FAToken">
                            <Form.Label>Enter 2FA Token</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter 2FA token"
                                value={twoFactorToken}
                                onChange={(e) => setTwoFactorToken(e.target.value.replace(/\s+/g, ''))}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow2FAModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handle2FAVerification}>
                        Verify
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default LogInUser;