import axios from "axios";
import { useEffect, useState } from "react";
import { Link, navigate, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Button, Form, Container, Card } from "react-bootstrap";
import "./SignUp.css"

const NewSignUp = () => {
    const navigate = useNavigate();
    const [ufirstName, setfirstName] = useState("");
    const [uLastName, setLastName] = useState("");
    const [uMiddleInitial, setMiddleInitial] = useState("");
    const [uemail, setemail] = useState("");
    const [uBirth, setBirth] = useState("");
    const [upassword, setPass] = useState(1);
    const [uNumber, setNumber] = useState(1);
    const [uGender, setGender] = useState("Male");
    const [urole, setURole] = useState("Patient");

    const registerUser =(e) => {
        e.preventDefault();

        if(urole === "Practitioner")
            {
                const doctorUser = {
                    dr_firstName: ufirstName,
                    dr_lastName: uLastName,
                    dr_middleInitial: uMiddleInitial,
                    dr_email: uemail,
                    dr_password: upassword,
                    dr_dob: uBirth,
                    dr_contactNumber: uNumber,
                    dr_gender: uGender, 
                }
                    axios.post('http://localhost:8000/doctor/api/signup', doctorUser)
                    .then((response) => {
                        console.log(response);
                        window.alert("Successfully registered User");
                        navigate('/medapp/login');
            
                    })
                    .catch((err)=> {
                        console.log(err);
                    })
            }
            else if (urole === "Patient") {
                const patientUser = {
                    patient_firstName: ufirstName,
                    patient_middleInitial: uMiddleInitial,
                    patient_lastName: uLastName,
                    patient_email: uemail,
                    patient_password: upassword,
                    patient_dob: uBirth,
                    patient_contactNumber: uNumber,
                    patient_gender: uGender,
                };
                console.log(patientUser)
                axios.post('http://localhost:8000/patient/api/signup', patientUser)
                    .then((response) => {
                        console.log(response);
                        window.alert("Successfully registered User");
                        navigate('/medapp/login');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            
     
    }

    return (
        <>
          <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="container">
        <Card.Body>
        <div className="container ">
            <h1> Sign Up </h1>
            <hr/>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formFName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name" onChange={(e)=>{setfirstName(e.target.value)}} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formLName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name" onChange={(e)=>{setLastName(e.target.value)}} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formMName">
                        <Form.Label>Middle Initial</Form.Label>
                        <Form.Control type="text" placeholder="Enter Middle Initial" onChange={(e)=>{setMiddleInitial(e.target.value)}} />
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="formBirthDate">
                        <Form.Label>Birthdate</Form.Label>
                        <Form.Control type="date" placeholder="Enter Birthdate" onChange={(e)=>{setBirth(e.target.value)}} />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="formContactNumber">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter Contact Number" onChange={(e)=>{setNumber(e.target.value)}} />
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email Address" onChange={(e)=>{setemail(e.target.value)}} />
                    </Form.Group>

                    
                </Row>

                <Row>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" onChange={(e)=>{setPass(e.target.value)}} />
                    </Form.Group>


                </Row>

                <Row>
                    <Form.Group as={Col} controlId="formChooseGender">
                        <Form.Label>Gender:</Form.Label>
                        <Form.Select onChange={(e) => setGender(e.target.value)} defaultValue="Gender">
                                <option value="Male">Male</option>
                             <option value="Female">Female</option>
                             <option value="Other">Other</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formChoose">
                        <Form.Label>Choose what to register:</Form.Label>
                        <Form.Select onChange={(e) => setURole(e.target.value)} defaultValue="Choose">
                            <option value="Patient">Patient</option>
                            <option value="Practitioner">Practitioner</option>
                            <option value="Secretary">Medical Secretary</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <div className="d-lg-flex justify-content-between align-items-center mt-3">
                    <div className="d-flex">
                        <Button onClick={()=>{registerUser()}} variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                    <div className="mb-0">
                        <a href="/medapp/login">Already have an account?</a>
                    </div>
                </div>
            </Form>
        </div>
        </Card.Body>
        </Card>
        </Container>

            
        </>
    )
}
export default NewSignUp;