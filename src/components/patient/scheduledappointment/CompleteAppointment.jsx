import { useNavigate, useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState,  } from "react";
import PatientNavBar from "../PatientNavBar/PatientNavBar";
import './Appointment.css'
function CompleteAppointment() {
    const [theDoctor, setAllDoctor] = useState([]);
    const [theDocId, setAllDocId] = useState([]);
    const [appointmentID, setAppointmentID] = useState("");
    const { pid } = useParams(); 
    const navigate = useNavigate();
    const defaultImage = "images/NoProfile.jpg";
    useEffect(() => {
        axios.get(`http://localhost:8000/patient/api/onepatient/${pid}`)
            .then((res) => {
                
                setAllDoctor(res.data.thePatient.patient_appointments);
                console.log(res.data.thePatient);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


 
    return (
        <>
        <div className='mainContainer'>
            <div>
            {theDoctor
            .filter(appointment => appointment.status === 'Completed')
            .map((doctor,index)=>{
                const doctorImage = doctor?.doctor.dr_image || defaultImage;
                console.log(doctor.doctor);
            return (
                <div className="subContainer" key={index}>
                    <div className="aContainer" key={index}>
                        <div> 
                            <img src={`http://localhost:8000/${doctorImage}`} alt="Doctor" className='app-image' />
                        </div>
                        <div>
                            <p style={{marginLeft: '10px'}}> Dr. {doctor.doctor.dr_firstName} {doctor.doctor.dr_middleInitial}. {doctor.doctor.dr_lastName} </p>
                            <p style={{marginLeft: '10px'}}> Status: {doctor.status} </p>
                            <p style={{marginLeft: '10px'}}> Date/Time: {doctor.date}/{doctor.time} </p>
                        </div>
                      
                   
                    </div>

                </div>
                
            )
           })}

            </div>
       

        </div>
        
        </>
    );
}

export default CompleteAppointment;
