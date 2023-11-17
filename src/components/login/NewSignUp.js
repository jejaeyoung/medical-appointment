import axios from "axios";
import { useEffect, useState } from "react";
import { Link, navigate, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";

const NewSignUp = () => {
    const navigate = useNavigate();
    const [ufirstName, setfirstName] = useState("");
    const [uLastName, setLastName] = useState("");
    const [uemail, setemail] = useState("");
    const [upassword, setPass] = useState(1);

    const [allRole, setAllRole] = useState([]);
    const [urole, setURole] = useState("");

    const registerUser =() => {
        const nUser = {
            firstName: ufirstName,
            lastName: uLastName,
            email: uemail,
            password: upassword,
            role: urole
        }

        axios.post('http://localhost:8000/api/medapp/signup'+ nUser)
        .then((response) => {
            console.log(response);
            window.alert("Successfully registered User");
            navigate ('medapp/login');
            // response.render("medapp/login");
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
            <h1> Sign Up </h1>
            
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
                    <Form.Control type="password" placeholder="Enter Password" onChange={(e)=>{setPassl(e.target.value)}} />
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} controlId="formChoose">
                    <Form.Label>Choose what to register:</Form.Label>
                    <Form.Select onChange={(e)=>{setAllRole(e.target.value)}} defaultValue="Choose">
                        <option onChange={(e)=> {setURole(e.target.value)}} >Patient</option>
                        <option onChange={(e)=> {setURole(e.target.value)}}>Practitioner</option>
                    </Form.Select>
                    </Form.Group>
                </Row>
            </Form>
            <button onClick={()=>{registerUser()}}>Register</button>
            <hr/>

            <a href="medapp/login">Already have an account?</a>
        </>
    )
}
export default NewSignUp;