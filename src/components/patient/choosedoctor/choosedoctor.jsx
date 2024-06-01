import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState,  } from "react";
import './ChooseDoctor.css'
import PatientNavBar from "../PatientNavBar/PatientNavBar";

function ChooseDoctor() {
    const [theDoctors, setAllDoctors] = useState([]);
    const [theDocId, setAllDocId] = useState([]);
    const { pid } = useParams(); 
    const navigate = useNavigate();
    const defaultImage = "images/NoProfile.jpg";
    // Display all the available doctors and able to direct to appointment form and pass it through the frontend.
    useEffect(() => {
        axios.get(`http://localhost:8000/doctor/api/alldoctor`)
            .then((res) => {
                console.log(res.data.theDoctor); // Log the response data
                setAllDoctors(res.data.theDoctor); // Set state to the data property of the response
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleDoctorClick = (did) => {
        navigate(`/doctorprofile/${pid}/${did}`); // Navigate to appointment page with uid and doctorId
    };

    return (
        <>
            <PatientNavBar/>
    
            <div className="cd-container">
                <div>
                    {theDoctors.map((doctor, index) => {
                        console.log(doctor.dr_image);
                        const doctorImage = doctor.dr_image || defaultImage
                        return (
                            <div className="cd-card" key={index} onClick={() => handleDoctorClick(doctor._id)}>
                                <div className="cd-acontent">
                                    <div>
                                        <div className="d-flex">
                                            <img src={`http://localhost:8000/${doctorImage}`} alt="Doctor" className='app-image' />
                                            <div className="cd-name"> 
                                                <h4>{doctor.dr_firstName} {doctor.dr_middleInitial}. {doctor.dr_lastName} </h4>
                                            </div>
                                        </div>
                                        {/* You can remove the button since the entire card is clickable now */}
                                    </div>
                                    <div>
                                        {/* Additional content here if needed */}
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

export default ChooseDoctor;
