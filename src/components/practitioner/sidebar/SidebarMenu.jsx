import React, { useState } from "react";

import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './SidebarMenu.css';



import { CDBSidebar, CDBSidebarContent, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem,CDBSidebarFooter, CDBIcon} from 'cdbreact';


const SidebarMenu = () => {

  const [isLeftIcon, setIsLeftIcon] = useState(true);
  const toggleIcon = () => {
    setIsLeftIcon((prevState) => !prevState);
  };
  return (
    <>
      <CDBSidebar>
        <CDBSidebarHeader prefix={<i className={`fa ${isLeftIcon ? "fa-angle-left" : "fa-angle-right"}`} onClick={()=>{toggleIcon()}} />}>
          Contrast 
        </CDBSidebarHeader>
        
        <CDBSidebarContent>
          <CDBSidebarMenu>
              <CDBSidebarMenuItem icon="th-large"> Dashboard </CDBSidebarMenuItem>
              <CDBSidebarMenuItem icon="chess-bishop"> Appointment </CDBSidebarMenuItem>
              <CDBSidebarMenuItem icon="credit-card" > Notification </CDBSidebarMenuItem>
              <CDBSidebarMenuItem icon="credit-card"> Calendar </CDBSidebarMenuItem>
              <CDBSidebarMenuItem icon="credit-card" iconType="solid"> Account Information </CDBSidebarMenuItem>
              <CDBSidebarMenuItem icon="credit-card" iconType="solid"> Log Out </CDBSidebarMenuItem>

              <NavLink exact to="/tables" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="table">Tables</CDBSidebarMenuItem>
              </NavLink>

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