
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Navbar, Nav, Table} from 'react-bootstrap';
import axios from "axios";
import * as Icon from "react-bootstrap-icons";
import './PatientNavBar.css'
function PatientNavBar() {
    const navigate = useNavigate();
    const {pid} = useParams();
    // console.log(pid);
    const onButtonContainerClick = (() => {
        navigate(`/choosedoctor/${pid}`);
    });

    const onButtonContainer1Click = (() => {
        navigate("/");
    });

    const MyAppointment = (() => {
        navigate(`/myappointment/${pid}`);
    });


  return (
    <>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand>
                        <b className="medical-appointment">Team Hortons</b>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            
                        </Nav>
                        <Nav>
                            <Button className="button1" onClick={MyAppointment}>My Appointments</Button>
                            <Button className="button1" onClick={onButtonContainerClick}>Choose Doctor</Button>
                            <Button className="button1" onClick={onButtonContainer1Click}>Logout</Button>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        
           



    </>
  );
};

export default PatientNavBar;
