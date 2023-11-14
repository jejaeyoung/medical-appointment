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
           <span className="headercustom">Hello! Doc, Daniel Sebastian</span> 
        </CDBSidebarHeader>
        
        <CDBSidebarContent>
          <CDBSidebarMenu>
              <CDBSidebarMenuItem  suffix={
                  <CDBBadge  size="small" borderType="pill">
                    10+
                  </CDBBadge>
                }
               icon="th-large"> Dashboard </CDBSidebarMenuItem>
              <CDBSidebarMenuItem icon="calendar-alt"> Appointment </CDBSidebarMenuItem>
              <CDBSidebarMenuItem icon="bell" > Notification </CDBSidebarMenuItem>
              <CDBSidebarMenuItem icon="calendar-check"> Calendar </CDBSidebarMenuItem>
              <CDBSidebarMenuItem icon="user" iconType="solid"> Account Information </CDBSidebarMenuItem>
              <CDBSidebarMenuItem icon="credit-card" iconType="solid"> Log Out </CDBSidebarMenuItem>

              <Link exact to="/tables" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="table">Tables</CDBSidebarMenuItem>
              </Link>

          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div className="sidebar-btn-wrapper" style={{ padding: "20px 5px" }}>
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
      

    </>
  );
};

export default SidebarMenu;