import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState,  } from "react";
import PatientNavBar from "../PatientNavBar/PatientNavBar";

function MyAppointment() {
    const [theDoctor, setAllDoctor] = useState([]);
    const [theDocId, setAllDocId] = useState([]);
    const { pid } = useParams(); 
    const navigate = useNavigate();
   
    useEffect(() => {
        axios.get(`http://localhost:8000/patient/api/onepatient/${pid}`)
            .then((res) => {
                
                setAllDoctor(res.data.thePatient.patient_appointments);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    return (
        <>
            <PatientNavBar/>
            {theDoctor.map((doctor,index)=> {
                console.log(doctor);
                return (
                    <>
                        <div></div>
                    </>
                )
            })}
          
        </>
    );
}

export default MyAppointment;
