import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FormLabel, Row, Form, Col, Button } from "react-bootstrap";
import NewSignUp from "./NewSignUp";
import { Container } from "react-bootstrap/lib/Tab";

const LogInUser = () => {
    const navigate = useNavigate();
    const [oneEmail, setTheUserMail] = useState("");
    const [OnePass, setThePass] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [UsernameArr, setUArr] = useState([]);
    const [user, setTheUser] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8000/api/medapp/allusers")
        .then((response) => {
            setAllUsers(response.data.allUsers)
            setUArr(allUsers.map(user => user.email))
            console.log(UsernameArr)
        })
        .catch((err)=> {
            console.log(err)
        })
    },[oneEmail])

    const loginuser = (e) => {
        e.preventDefault();
        if(UsernameArr.includes(oneEmail) === true) {
            
            axios.get("http://localhost:8000/api/medapp/user/" +oneEmail)
            .then((response) => {
                console.log(response)
                setTheUser(response.data.oneUser);
            })
            .catch((err) => {console.log(err+ "User err")});

            if(user.password === OnePass) {
                console.log("Successfully logged in")
                window.alert("Successfully logged in")
                navigate("/") //nav to dashboard
            }
            else {
                window.alert("Wrong Email or Password")
            }
        }
        else {
            console.log("Not found")
            window.alert("User not found")
        }
    }


    return (
        <>
            <Container className="d-flex justify-content-center align-items-center vh-100">

            <div className="container">

            <h1> Log In </h1>
            <Form>
                <Row className="mb-3">
                    <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" value="Enter Email Address" onChange={(e)=>{setTheUserMail(e.target.value)}} />
                    </Form.Group>
                </Row>
                    
                <Row className="mb-3">
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value="Enter Password" onChange={(e)=>{setThePass(e.target.value)}} />
                        </Form.Group>
                </Row>

                <Row className="mb-3">
                <Form.Check type="checkbox" id="autoSizingCheck" className="mb-2"label="Remember me"/>
                <a href>Forgot Password?</a>
                </Row>

                <div className="d-lg-flex justify-content-between align-items-center mt-3">
                    <div className="d-flex"> 
                        <Button type="submit" className="mb-2" onClick={(e) => {loginuser(e)}}>
                            Log In
                        </Button>
                    </div>
                </div>

                <div className="mb-0">
                <a href="medapp/signup">No account yet? Sign up</a>
                </div>
            </Form>
            </div>

        </Container>

        </>
    )
}
export default LogInUser;