import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormLabel, Row, Form, Col, Button, Container, Nav } from "react-bootstrap";
import './LogIn.css'
import TheImage from './images/LoginImage.png'
import NavigationalBar from '../landpage/navbar'


const LogInUser = () => {
    const navigate = useNavigate();
    const [oneEmail, setTheUserMail] = useState("");
    const [OnePass, setThePass] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [allPass, setAllPass] = useState([]);
    const [uRole, setuRole] = useState("Patient");
    const [UsernameArr, setUArr] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (uRole === "Patient") {
                    response = await axios.get("http://localhost:8000/patient/api/allpatient");

                } else if (uRole === "Practitioner") {
                    response = await axios.get("http://localhost:8000/doctor/api/alldoctor");
                }

                if (uRole === 'Patient' && response && response.data) {
                    const userData = response.data.thePatient;
                    setAllUsers(userData);

                    const emails = userData.map(user => user.patient_email);
                    setUArr(emails);
                    console.log(emails);

                    const passwords = userData.map(user => user.patient_password);
                    setAllPass(passwords);
                    console.log(passwords);
                 
                }else if (uRole === 'Practitioner' && response && response.data){
                    const userData = response.data.theDoctor;
                    setAllUsers(userData);

                    const emails = userData.map(user => user.dr_email);
                    setUArr(emails);
                    console.log(emails);

                    const passwords = userData.map(user => user.dr_password);
                    setAllPass(passwords);
                    console.log(passwords);
                
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [oneEmail, uRole]);

    const loginuser = (e) => {
        e.preventDefault();

        const emailIndex = UsernameArr.indexOf(oneEmail);
        if (emailIndex !== -1 && OnePass === allPass[emailIndex]) {
            const user = allUsers[emailIndex];


            window.alert("Successfully logged in");
            console.log(user._id);
            navigate(`/dashboard/${user._id}`);
        } else {
            window.alert("Wrong Email or Password");
        }
    };

    return (
        <>
        <NavigationalBar/>
        <div className="align-items-center  d-flex vh-100">
                    
            <Container fluid className="maincontainer d-flex justify-content-center align-items-center ">
                    {/* <div className="imageContainer">
                        <Col   Col md={6} className="text-center">
                            <img className="col-md-6 image1" alt="" src={TheImage} />
                        </Col>
                    </div> */}
                  
                    <div className="container">
                        <h1>Welcome Back!</h1>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter Email Address"
                                        onChange={(e) => {
                                            setTheUserMail(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="align-items right">
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter Password"
                                        onChange={(e) => {
                                            setThePass(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group as={Col} controlId="formChoose">
                                    <Form.Label>Choose what to register:</Form.Label>
                                    <Form.Select onChange={(e) => setuRole(e.target.value)} defaultValue="Choose">
                                        <option value="Patient">Patient</option>
                                        <option value="Practitioner">Practitioner</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                
                                
                            </Row>

                            
                                <div className="justify-content-center">
                                    <Button type="submit" className="mb-2 buttonStyle" onClick={(e) => { loginuser(e) }}>
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
            

            <p>
                
            </p>
        </>
    );
};

export default LogInUser;
