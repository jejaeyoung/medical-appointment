import React from 'react'
import SidebarMenu from '../sidebar/SidebarMenu'
import { CDBCard, CDBCardImage, CDBCardBody, CDBCardTitle, CDBCardText, CDBBtn, CDBContainer,  } from "cdbreact";
import './Dashboard.css';

function Dashboard() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flex: "1 1 auto",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <SidebarMenu />
        <div style={{  padding: "20px", }}>
        <CDBContainer className='removegatter'>
          <h1>Dashboard</h1>
          <CDBContainer className='removegatter'>
            <p>Overview</p>
          </CDBContainer>


        </CDBContainer>
        
        </div>
      </div>
    </>
  );
}

export default Dashboard
