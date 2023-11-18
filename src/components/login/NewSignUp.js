import axios from "axios";
import { useEffect, useState } from "react";
import { Link, navigate, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Button, Form, Container, Card } from "react-bootstrap";
import "./SignUp.css"

const NewSignUp = () => {
    const navigate = useNavigate();
    const [ufirstName, setfirstName] = useState("");
    const [uLastName, setLastName] = useState("");
    const [uemail, setemail] = useState("");
    const [upassword, setPass] = useState(1);

    const [allRole, setAllRole] = useState([]);
    const [urole, setURole] = useState("Patient");

    const registerUser =() => {
        const nUser = {
            firstName: ufirstName,
            lastName: uLastName,
            email: uemail,
            password: upassword,
            role: urole
        }

        axios.post('http://localhost:8000/api/medapp/signup', nUser)
        .then((response) => {
            console.log(response);
            window.alert("Successfully registered User");
             navigate('/medapp/login');
   
        })
        .catch((err)=> {
            console.log(err);
        })
    }

    // useEffect(()=> {
    //     axios.get('http://localhost:8000/')
    //     .then((response) => {
    //         console.log(response.data.results);
    //         setAllRole(response.data.results);
    //     })
    //         .catch((err)=> {
    //             console.log(err)
    //         })
    // },[])

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
                </Row>

                <Row>
                    <Form.Group className="mb-3" controlId="formEmail">
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
                    <Form.Group as={Col} controlId="formChoose">
                        <Form.Label>Choose what to register:</Form.Label>
                        <Form.Select onChange={(e) => setURole(e.target.value)} defaultValue="Choose">
                            <option value="Patient">Patient</option>
                             <option value="Practitioner">Practitioner</option>
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