
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Navbar, Nav, } from 'react-bootstrap';
import "./Landing.css";
import NavigationalBar from "./navbar";
function LandingPage () {
//   const navigate = useNavigate();

//   const onButtonContainerClick = (() => {
//     navigate("/medapp/signup");
//   });

//   const onButtonContainer1Click = (() => {
//     navigate("/medapp/login");
//   });

  return (
    <>
     
        
            <NavigationalBar/>
            <Container fluid>
                <Row className="d-flex align-items-center justify-content-center">
                    <Col md={6} className="text-center">
                        <b className="h5-header-tag-sec-">Welcome </b>
                        <b className="h1-headline-sec-">Team Hortons</b>
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


 
    </>
  );
};

export default LandingPage;
