import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import './SidebarMenu.css';
import { CDBSidebar, CDBSidebarContent, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem, CDBSidebarFooter, CDBIcon, CDBBadge } from 'cdbreact';
import { Modal, Button } from 'react-bootstrap';

const SidebarMenu = (props) => {
  const [isLeftIcon, setIsLeftIcon] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const toggleIcon = () => {
    setIsLeftIcon(!isLeftIcon);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    // Perform the actual logout logic here
    // Example: axios.post('/logout').then(() => navigate('/'));
    navigate('/');
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const defaultImage = "images/NoProfile.jpg";

  return (
    <>
      <CDBSidebar>
        <CDBSidebarHeader prefix={<i className={`fa ${isLeftIcon ? "fa-angle-left" : "fa-angle-right"}`} onClick={toggleIcon} />}>
          <div className="sm-header">
            <img 
              src={props.doctor_image ? `http://localhost:8000/${props.doctor_image}` : defaultImage} 
              alt="Doctor" 
              style={{ width: "60px", height: "60px", borderRadius: "100%", objectFit: 'cover', textAlign:'center' }}
            />
            <div className="sm-header1">
              <span className="headercustom">Hello! Dr. {props.doctor_name}</span>
            </div>
          </div>
        </CDBSidebarHeader>

        <CDBSidebarContent>
          <CDBSidebarMenu>
            <Link to={`/dashboard/${props.did}`}>
              <CDBSidebarMenuItem suffix={<CDBBadge size="small" borderType="pill">10+</CDBBadge>} icon="th-large"> Dashboard </CDBSidebarMenuItem>
            </Link>
            <Link to={`/mainappointment/${props.did}`}>
              <CDBSidebarMenuItem icon="calendar-alt" > Appointment </CDBSidebarMenuItem>
            </Link>
            <CDBSidebarMenuItem icon="bell"> Notification </CDBSidebarMenuItem>
            <Link to={`/medicalrecord/${props.did}`}>
              <CDBSidebarMenuItem icon="book" iconType="solid"> Medical Records </CDBSidebarMenuItem>
            </Link>
            <Link to={`/account/${props.did}`}>
              <CDBSidebarMenuItem icon="user" iconType="solid"> Account Information </CDBSidebarMenuItem>
            </Link>
            <CDBSidebarMenuItem icon="arrow-left" iconType="solid" onClick={handleLogout}> Log Out </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div className="sidebar-btn-wrapper" style={{ padding: "20px 5px" }}>
            <img className="pnb-logoimage" src={`http://localhost:8000/images/LandaganLOGO.png`} alt="Logo" />
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>

      <Modal show={showLogoutModal} onHide={cancelLogout}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to log out?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelLogout}>
            No
          </Button>
          <Button variant="primary" onClick={confirmLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SidebarMenu;
