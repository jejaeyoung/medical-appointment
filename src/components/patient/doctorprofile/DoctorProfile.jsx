import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Navbar, Nav, Table } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState } from "react";
import './DoctorProfile.css';
import PatientNavBar from "../PatientNavBar/PatientNavBar";
import AppointmentModal from "./AppointmentModal"; // Adjust the path as needed
import { Scrollbars } from "react-custom-scrollbars";

function DoctorProfile() {
    const [theDoctor, setTheDoctor] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [theImage, setTheImage] = useState("");
    const [theSpecialty, setTheSpecialty] = useState("");
    const [availability, setAvailability] = useState({});
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
        
            setTheImage(res.data.theDoctor.dr_image || defaultImage);
          })
          .catch((err) => {
            console.log(err);
          });
    }, [did]);

    useEffect(() => {
        axios
          .get(`http://localhost:8000/doctor/api/post/getallpost/${did}`)
          .then((res) => {
            setThePost(res.data.posts);
          })
          .catch((err) => {
            console.log(err);
          });
    }, [did]);

    useEffect(() => {
        axios
          .get(`http://localhost:8000/doctor/${did}/available`)
          .then((res) => {
            setAvailability(res.data.availability);
          })
          .catch((err) => {
            console.log(err);
          });
    }, [did]);

    const handleDoctorClick = (did) => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const renderAvailability = (day) => {
        const dayAvailability = availability[day];
        if (!dayAvailability) return <td colSpan="2">Doctor is not available</td>;
    
        const formatTime = (time) => {
            const [hour, minute] = time.split(':');
            const parsedHour = parseInt(hour);
            if (parsedHour === 12) {
                return `${hour}:${minute} PM`;
            } else if (parsedHour > 12) {
                return `${parsedHour - 12}:${minute} PM`;
            } else {
                return `${hour}:${minute} AM`;
            }
        };
    
        const morningAvailability = dayAvailability.morning.available ? `${formatTime(dayAvailability.morning.startTime)} - ${formatTime(dayAvailability.morning.endTime)}` : 'Not available';
        const afternoonAvailability = dayAvailability.afternoon.available ? `${formatTime(dayAvailability.afternoon.startTime)} - ${formatTime(dayAvailability.afternoon.endTime)}` : 'Not available';
    
        return (
            <>
                <td>{morningAvailability}</td>
                <td>{afternoonAvailability}</td>
            </>
        );
    };
    

    return (
        <>
          <div style={{ width: '100%', height: '100vh'}}>
         <Scrollbars style={{ width: '100%', height: '100%' }}>
            <PatientNavBar />
           

            
          
               

                <div className="dp-main">
                <div className="dp-containermain">
                    <div>
                        <h1>Doctor Information</h1>
                        <div className="dp-container1">
                            <img src={`http://localhost:8000/${theImage}`} alt="Doctor" className='dp-image' />
                            <div className="dp-container2">
                                <h3> {theDoctor.dr_firstName} {theDoctor.dr_middleInitial}. {theDoctor.dr_lastName} </h3>
                                <p style={{fontStyle: 'italic'}}>{theDoctor.dr_specialty}</p>
                            </div>
                            <div className="dp-container3">
                                <Button onClick={() => handleDoctorClick(did)}>Book Now</Button>
                            </div>
                        </div>
                    </div>

                    <div className='dp-schedule'>
                        <h1>Weekly Schedule</h1>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Morning Availability</th>
                                    <th>Afternoon Availability</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Monday</td>
                                    {renderAvailability('monday')}
                                </tr>
                                <tr>
                                    <td>Tuesday</td>
                                    {renderAvailability('tuesday')}
                                </tr>
                                <tr>
                                    <td>Wednesday</td>
                                    {renderAvailability('wednesday')}
                                </tr>
                                <tr>
                                    <td>Thursday</td>
                                    {renderAvailability('thursday')}
                                </tr>
                                <tr>
                                    <td>Friday</td>
                                    {renderAvailability('friday')}
                                </tr>
                                <tr>
                                    <td>Saturday</td>
                                    {renderAvailability('saturday')}
                                </tr>
                                <tr>
                                    <td>Sunday</td>
                                    {renderAvailability('sunday')}
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    <div className='dp-posts'>
                        <h1>Announcements</h1>
                        {thePost.slice().reverse().map((post, index) => (
                            <div key={index}>
                                <div className="d-flex align-items-center justify-content-between">
                                    <li className="list-unstyled decoration-none" key={index}>
                                        {post.content}
                                    </li>
                                </div>
                                <hr className="divider d-lg" />
                            </div>
                        ))}
                    </div>

               
                </div>
                <AppointmentModal show={showModal} handleClose={handleCloseModal} pid={pid} did={did} />
                
                
            </div>
      
            </Scrollbars>
            </div>
        </>
    );
}

export default DoctorProfile;
