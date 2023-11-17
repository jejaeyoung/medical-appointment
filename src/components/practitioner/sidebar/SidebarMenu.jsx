import React, { useState } from "react";

import { Link } from 'react-router-dom';
import './SidebarMenu.css';



import { CDBSidebar, CDBSidebarContent, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem,CDBSidebarFooter, CDBIcon,  CDBBadge} from 'cdbreact';


const SidebarMenu = () => {

  const [isLeftIcon, setIsLeftIcon] = useState(true);
  const toggleIcon = () => {
    setIsLeftIcon(!isLeftIcon);
  };
  return (
    <>
      <CDBSidebar>
        <CDBSidebarHeader   prefix={<i className={`fa ${isLeftIcon ? "fa-angle-left" : "fa-angle-right"}`} onClick={()=>{toggleIcon()}}  />}  >
           <span className="headercustom">Hello! Doc, Daniel</span> 
        </CDBSidebarHeader>
        
        <CDBSidebarContent>
          <CDBSidebarMenu>
              <Link to={`/practitioner/dashboard`}>
                <CDBSidebarMenuItem  suffix={<CDBBadge  size="small" borderType="pill">10+</CDBBadge>}icon="th-large"> Dashboard </CDBSidebarMenuItem>
              </Link>

              <CDBSidebarMenuItem icon="calendar-alt"> Appointment </CDBSidebarMenuItem>
              <CDBSidebarMenuItem icon="bell" > Notification </CDBSidebarMenuItem>
              <CDBSidebarMenuItem icon="calendar-check"> Calendar </CDBSidebarMenuItem>
              <CDBSidebarMenuItem icon="user" iconType="solid"> Account Information </CDBSidebarMenuItem>
              <CDBSidebarMenuItem icon="credit-card" iconType="solid"> Log Out </CDBSidebarMenuItem>

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