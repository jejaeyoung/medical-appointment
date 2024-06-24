import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState } from "react";
import PatientNavBar from "../PatientNavBar/PatientNavBar";

function ChooseDoctorSpecialization({ did }) {
    const [theDoctors, setAllDoctors] = useState([]);
    const { specialty, pid } = useParams();
    const navigate = useNavigate();
    const defaultImage = "images/014ef2f860e8e56b27d4a3267e0a193a.jpg";

    useEffect(() => {
        axios.get(`http://localhost:8000/doctor/api/alldoctor`)
            .then((res) => {
                const filteredDoctors = res.data.theDoctor.filter(doctor => 
                    doctor.dr_specialty && doctor.dr_specialty.toLowerCase() === specialty.toLowerCase()
                );
                setAllDoctors(filteredDoctors);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [specialty]);

    const handleDoctorClick = (did) => {
        navigate(`/doctorprofile/${pid}/${did}`);
    };

    return (
        <>
             <PatientNavBar/>

           
<div style={{paddingTop: '40px'}}>

</div>
<div className="cd-main">
    
    <div className="cd-containergrid">
        {theDoctors.map((doctor, index) => {
            console.log(doctor.dr_image);
            const doctorImage = doctor.dr_image || defaultImage
            return (
                <>
                    <Card  className="cd-card" onClick={() => handleDoctorClick(doctor._id)}>
                        <Card.Img variant="top" src={`http://localhost:8000/${doctorImage}`} />
                            <Card.Body>
                                <Card.Title style={{textAlign: "center"}}>{doctor.dr_firstName} {doctor.dr_middleInitial}. {doctor.dr_lastName}</Card.Title>
                                <p style={{textAlign: 'center', fontSize:'14px', fontStyle:'italic'}}>{doctor.dr_specialty}</p>
                                <Card.Text>
                                "Lorem ipsum dolor sit "Lorem ipsum dolor sit amet, consectetur 
                                </Card.Text>
                            </Card.Body>
                    </Card>
                </>
            )
        })}
    </div>
</div>
        </>
    );
}

export default ChooseDoctorSpecialization;
