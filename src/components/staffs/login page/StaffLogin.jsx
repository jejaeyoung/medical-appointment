import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Row, Form, Col, Button, Container } from 'react-bootstrap';




const StaffLogIn = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [userRole, setUserRole] = useState("Medical Secretary");

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (userRole === "Medical Secretary") {
                    response = await axios.get("http://localhost:8000/medicalsecretary/api/allmedicalsecretary");
                } else if (userRole === "Practitioner") {
                    response = await axios.get("http://localhost:8000/doctor/api/alldoctor");
                }

                if (response && response.data) {
                    const userData = response.data.theMedicalSecretary 
                    console.log(userData);
                    setUsers(userData);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [userRole]);

    const StaffLogIn = async (e) => {
        e.preventDefault();

        const user = users.find(user => 
         
          user.ms_username === username || 
          user.dr_email === username);
        
          
        if (user && (
            user.ms_password === password || 
            user.dr_password === password
            )) {


            const userId = user._id;
            window.alert("Successfully logged in");
            navigate(userRole === 'Medical Secretary' ? `/medsec/${userId}` : `/dashboard/${userId}`);
        } else {
            window.alert("Invalid email or password. Please try again.");
        }
    };

    return (
        <>
        
            <div className="align-items-center d-flex vh-100">
                <Container fluid className="maincontainer d-flex justify-content-center align-items-center">
                    <div className="container">
                        <h1>Staff Login</h1>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
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
                                        <option value="Medical Secretary">Medical Secretary</option>
                                        <option value="Pharmacist">Pharmacist</option>
                                        <option value="Admin">Admin</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3"></Row>
                            <div className="justify-content-center">
                                <Button type="submit" className="mb-2 buttonStyle" onClick={StaffLogIn}>
                                    Log In
                                </Button>
                            </div>
                            <div className="mb-0">
                               
                            </div>
                        </Form>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default StaffLogIn;
