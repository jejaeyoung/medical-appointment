
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Navbar, Nav, } from 'react-bootstrap';
import PatientNavBar from "../PatientNavBar/PatientNavBar";
function HomePagePatient

 () {
//   const navigate = useNavigate();

//   const onButtonContainerClick = (() => {
//     navigate("/medapp/signup");
//   });

//   const onButtonContainer1Click = (() => {
//     navigate("/medapp/login");
//   });

  return (
    <>
            <PatientNavBar/>
        
           


            <p>This is homepage</p>
    </>
  );
};

export default HomePagePatient

;
