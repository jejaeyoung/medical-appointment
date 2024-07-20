import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Bell, ChevronDown } from 'react-bootstrap-icons';
import axios from 'axios';
import './PatientNavBar.css';
import { Scrollbars } from 'react-custom-scrollbars';

function PatientNavBar() {
    const navigate = useNavigate();
    const { pid } = useParams();
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [itemsToShow, setItemsToShow] = useState(3);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/patient/api/onepatient/${pid}`);
                setNotifications(response.data.thePatient.notifications);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching notifications', error);
            }
        };

        fetchNotifications();
    }, [pid]);

    const onButtonContainerClick = () => {
        navigate(`/choosedoctor/${pid}`);
    };

    const onButtonContainer1Click = () => {
        navigate("/");
    };

    const MyAppointment = () => {
        navigate(`/myappointment/${pid}`);
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const showMore = () => {
        setItemsToShow(notifications.length);
    };

    const showLess = () => {
        setItemsToShow(3);
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

                        <Nav>
                            <Nav.Link onClick={toggleNotifications} className="position-relative">
                                <Bell size={20} />
                                {showNotifications && (
                                    <div className="notification-overlay">
                                        <Scrollbars style={{ height: '100vh', width: '100%' }} className="pp-scrollbar">
                                            {notifications.length > 0 ? (
                                                [...notifications].reverse().slice(0, itemsToShow).map((notification, index) => (
                                                    <div key={index} className="notification-item">
                                                        {notification.message}
                                                        {/* Cutting the hr in the last index of the array */}
                                                        {index < itemsToShow - 1 && index < notifications.length - 1 && <hr />}
                                                    </div>
                                                ))
                                            ) : (
                                                <div>No new notifications</div>
                                            )}
                                            {/* {itemsToShow === 3 ? (
                                                <button onClick={showMore}>Show More</button>
                                            ) : (
                                                <button onClick={showLess}>Show Less</button>
                                            )} */}
                                        </Scrollbars>
                                    </div>
                                )}
                            </Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default PatientNavBar;
