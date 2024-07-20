import React from 'react'
import { useNavigate } from "react-router-dom";
import { Container, Button, Navbar, Nav, } from 'react-bootstrap';
function MedSecNavbar() {
  return (
    <>
    
        <div className="landing-page">
            <div className="navbar-3">
                <Navbar bg="light" expand="lg">
                <Container>
                        
                            <img className="pnb-logoimage" src={`http://localhost:8000/images/LandaganLOGO.png`} alt="Logo" />
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link className="pnb-nav-link" onClick={MyAppointment}>My Appointments</Nav.Link>
                            <Nav.Link className="pnb-nav-link" onClick={onButtonContainerClick}>Choose Doctor</Nav.Link>
                        </Nav>
                        
                    </Navbar.Collapse>
                </Container>
                </Navbar>
            </div>
        </div>
    </>
  )
}

export default MedSecNavbar