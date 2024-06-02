import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState } from "react";
import './DoctorProfile.css';
import PatientNavBar from "../PatientNavBar/PatientNavBar";
import AppointmentModal from "./AppointmentModal";
 // Adjust the path as needed

function DoctorProfile() {
    const [theDoctor, setTheDoctor] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [theImage, setTheImage] = useState("");
    const { pid, did } = useParams();

    const [thePost, setThePost] = useState([]);
    const navigate = useNavigate();
    const defaultImage = "images/014ef2f860e8e56b27d4a3267e0a193a.jpg";



    useEffect(() => {
        axios
          .get(`http://localhost:8000/doctor/api/finduser/${did}`)
          .then((res) => {
            console.log(res.data.theDoctor);
            setTheDoctor(res.data.theDoctor);
            setTheImage(res.data.theDoctor.dr_image || defaultImage)
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

    useEffect(() => {
        axios
          .get(`http://localhost:8000/doctor/api/post/getallpost/${did}`)
          .then((res) => {

            setThePost(res.data.posts);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);



    const handleDoctorClick = (did) => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <PatientNavBar />
            <div style={{padding: '50px'}}>

           
            <div className="dp-main">
                
                

                <div>
                    <div>
                        <h1>Doctor Information</h1>
                        <div className="dp-container1">
                            <img src={`http://localhost:8000/${theImage}`} alt="Doctor" className='dp-image' />
                            <div className="dp-container2">
                                <h3> {theDoctor.dr_firstName} {theDoctor.dr_middleInitial}. {theDoctor.dr_lastName} </h3>
                                <p style={{fontStyle: 'italic'}}>Malibog Pag Lasing</p>
                            </div>
                            <div className="dp-container3">
                                <Button onClick={() => handleDoctorClick(did)}>Book Now</Button>
                            </div>
                        </div>
                    </div>
                        
                    <div classname='dp-posts'>
                        <h1>Announcements</h1>
                        {thePost.slice().reverse().map((post, index) => {
                           
                            return (
                           
                            <div key={index}>
                                <div className="d-flex align-items-center justify-content-between">
                                    <li className="list-unstyled decoration-none" key={index}>
                                    {post.content}
                                    </li>

                                </div>
                                <hr className="divider d-lg" />
                            </div>
                        )})}
                    </div>
                </div>
            </div>
            <AppointmentModal show={showModal} handleClose={handleCloseModal} pid={pid} did={did} />
            </div>
        </>
    );
}

export default DoctorProfile;
