import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState,  } from "react";
import PatientNavBar from "../PatientNavBar/PatientNavBar";

function ChooseDoctor() {
    const [theDoctors, setAllDoctors] = useState([]);
    const [theDocId, setAllDocId] = useState([]);
    const { pid } = useParams(); 
    const navigate = useNavigate();
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
        navigate(`/appointment/${pid}/${did}`); // Navigate to appointment page with uid and doctorId
    };

    return (
        <>
            <PatientNavBar/>
            <p>This is the list of available doctors</p>
            {theDoctors.map((doctor, index) => (
                <div key={index}>
                    {/* Should reflect the doctor ID and direct it to */}
                    <Button onClick={() => handleDoctorClick(doctor._id)}>{doctor.dr_firstName} {doctor.dr_middleInitial}. {doctor.dr_lastName}</Button> {/* Assuming each doctor object has a 'name' property */}
                </div>
            ))}
        </>
    );
}

export default ChooseDoctor;
