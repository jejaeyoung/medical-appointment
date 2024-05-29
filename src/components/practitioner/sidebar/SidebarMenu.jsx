import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './SidebarMenu.css';
import { CDBSidebar, CDBSidebarContent, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem, CDBSidebarFooter, CDBIcon, CDBBadge } from 'cdbreact';

const SidebarMenu = (props) => {
  const [isLeftIcon, setIsLeftIcon] = useState(true);
  const toggleIcon = () => {
    setIsLeftIcon(!isLeftIcon);
  };

  const defaultImage = 'path/to/default/image.jpg'; // Add a default image path here
  console.log(props.doctor_image);
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
          <div>
            
            </div>
          
          </div>
      
            
         
         
        </CDBSidebarHeader>
        
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <Link to={`/dashboard/${props.did}`}>
              <CDBSidebarMenuItem suffix={<CDBBadge size="small" borderType="pill">10+</CDBBadge>} icon="th-large"> Dashboard </CDBSidebarMenuItem>
            </Link>
            <Link to={`/mainappointment/${props.did}`}>
              <CDBSidebarMenuItem icon="calendar-alt"> Appointment </CDBSidebarMenuItem>
            </Link>
            <CDBSidebarMenuItem icon="bell"> Notification </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="calendar-check"> Calendar </CDBSidebarMenuItem>
            <Link to={`/account/${props.did}`}>
              <CDBSidebarMenuItem icon="user" iconType="solid"> Account Information </CDBSidebarMenuItem>
            </Link>
            <Link to={`/`}>
              <CDBSidebarMenuItem icon="credit-card" iconType="solid"> Log Out </CDBSidebarMenuItem>
            </Link>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div className="sidebar-btn-wrapper" style={{ padding: "20px 5px" }}>
            Medical Appointment
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </>
  );
};

export default SidebarMenu;
