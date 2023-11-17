import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FormLabel, Row, Form, Col, Button , Container} from "react-bootstrap";



const LogInUser = () => {
    const navigate = useNavigate();
    const [oneEmail, setTheUserMail] = useState("");
    const [OnePass, setThePass] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [allPass, setAllPass] = useState([]);
    const [UsernameArr, setUArr] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:8000/api/medapp/allusers")
        .then((response) => {
            const userData = response.data.theUser;
            setAllUsers(userData);
    
            const emails = userData.map(user => user.email);
            setUArr(emails);
            console.log(emails);

            const passwords = userData.map(user => user.password);
            setAllPass(passwords);
            console.log(passwords);
        })
        .catch((err)=> {
            console.log(err)
        })
    },[oneEmail])


    const loginuser = (e) => {
        e.preventDefault();


        const emailIndex = UsernameArr.indexOf(oneEmail);

        if (emailIndex !== -1 && OnePass === allPass[emailIndex]) {

            const user = allUsers[emailIndex];
            window.alert("Successfully logged in");
            console.log(user._id);
            navigate(`/practitioner/dashboard/${user._id}`); 
        } else {

            window.alert("Wrong Email or Password");
        }
    };


    return (
        <>
            <Container className="d-flex justify-content-center align-items-center vh-100">

            <div className="container">

            <h1> Log In </h1>
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

            <p>
                <Link to="/medapp/signup">No account yet? Sign up </Link>
            </p>
        </>
    )
}
export default LogInUser;