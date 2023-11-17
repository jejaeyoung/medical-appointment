
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Navbar, Nav, } from 'react-bootstrap';

function LandingPage () {
  const navigate = useNavigate();

  const onButtonContainerClick = (() => {
    navigate("/medapp/signup");
  });

  const onButtonContainer1Click = (() => {
    navigate("/medapp/login");
  });

  return (
    <>
     
        <div className="landing-page">
            <div className="navbar-3">
            <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>
                    <b className="medical-appointment">Medical Appointment</b>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        
                    </Nav>
                    <Nav>
                        <Button className="button1" onClick={onButtonContainerClick}>Sign Up</Button>
                        <Button className="button1" onClick={onButtonContainer1Click}>Log In</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>


            </div>

            <Container fluid>
                <Row className="d-flex align-items-center justify-content-center">
                    <Col md={6} className="text-center">
                        <b className="h5-header-tag-sec-">Welcome</b>
                        <b className="h1-headline-sec-">Online Appointment</b>
                        <div className="h4-sub-headline-sec-container ">
                            <p className="medical-functional-is">Medical Functional is most focused in helping you</p>
                            <p className="medical-functional-is">discover your most beautiful smile</p>
                        </div>
                        <div className="cta d-flex justify-content-center">
                          <div className="button-md-sec- mr-5">
                            <Button className="btn-text">Get Quote Now</Button>
                          </div>
                          <div className="button-md-sec-1 mr-5">
                            <Button className="btn-text2">Learn More</Button>
                        </div>
        </div>
                    </Col>
                    <Col md={6} className="text-center">
                        <img className="col-md-6-icon" alt="" src="https://static.vecteezy.com/system/resources/previews/002/896/807/non_2x/female-doctor-using-her-digital-tablet-free-vector.jpg" />
                    </Col>
                </Row>
            </Container>


            <div className="layout-1">
                <Container>
                    <Row>
                        <Col>
                            <div className="main-content">
                                <b className="h6-section-tag-sec-">Practice Advice</b>
                                <b className="h2-section-title-3">Our Activity</b>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <div className="card">
                                <img className="icon-cool-icon-11" alt="" src="https://cdn-icons-png.flaticon.com/512/1834/1834954.png" />
                                <b className="h5-header-tag-sec-">Emergency Case</b>
                                <div className="fixed-width-fixed-height-sec-" />
                                <div className="paragraph-feature-description-container">
                                    <p className="medical-functional-is">For medical emergency</p>
                                    <p className="medical-functional-is">please contact us immediately</p>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="card">
                                <img className="icon-cool-icon-11" alt="" src="https://previews.123rf.com/images/cosstudio/cosstudio1905/cosstudio190500681/123313780-healthcare-medical-emergency-call-vector-icon.jpg" />
                                <b className="h5-header-tag-sec-">Health Queries</b>
                                <div className="fixed-width-fixed-height-sec-" />
                                <div className="paragraph-feature-description-container">
                                    <p className="medical-functional-is">Any health-related</p>
                                    <p className="medical-functional-is">queries or concerns</p>
                                    <p className="medical-functional-is">should be addressed</p>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="card">
                                <img className="icon-cool-icon-11" alt="" src="https://cdn-icons-png.flaticon.com/512/3845/3845373.png" />
                                <b className="h5-header-tag-sec-">Painless procedures</b>
                                <div className="fixed-width-fixed-height-sec-" />
                                <div className="paragraph-feature-description-container">
                                    <p className="medical-functional-is">Reduce patient discomfort using</p>
                                    <p className="medical-functional-is">innovative technologies</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    </>
  );
};

export default LandingPage;
