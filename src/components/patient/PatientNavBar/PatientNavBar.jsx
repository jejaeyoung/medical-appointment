import { useNavigate, useParams, Link } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { ChevronDown } from 'react-bootstrap-icons';
import './PatientNavBar.css';

function PatientNavBar() {
    const navigate = useNavigate();
    const { pid } = useParams();

    const onButtonContainerClick = () => {
        navigate(`/choosedoctor/${pid}`);
    };

    const onButtonContainer1Click = () => {
        navigate("/");
    };

    const MyAppointment = () => {
        navigate(`/myappointment/${pid}`);
    };

    return (
        <>
            <Navbar expand="lg" className="pnb-navbar">
                <Container>
                    <Navbar.Brand>
                        <Link to={`/homepage/${pid}`}>
                            <img className="pnb-logoimage" src={`http://localhost:8000/images/LandaganLOGO.png`} alt="Logo" />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav justify-content-end">
                    

                            <Nav>
                                <Nav.Link className="pnb-nav-link" onClick={MyAppointment}>My Appointments</Nav.Link>
                                <Nav.Link className="pnb-nav-link" onClick={onButtonContainerClick}>Choose Doctor</Nav.Link>
                            </Nav>
                  
                        <Nav>
                            <NavDropdown title={<span>Account <ChevronDown /></span>} id="basic-nav-dropdown" className="pnb-nav-link1">
                                <NavDropdown.Item as={Link} to={`/accinfo/${pid}`}>Account Information</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item className="pnb-nav-link" onClick={onButtonContainer1Click}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default PatientNavBar;
