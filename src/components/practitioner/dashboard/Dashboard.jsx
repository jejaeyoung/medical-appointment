import React from 'react'
import SidebarMenu from '../sidebar/SidebarMenu'
import { CDBCard, CDBBadge,   } from "cdbreact";
import './Dashboard.css';

function Dashboard() {
  return (
    <>
      <div style={{display: "flex",flex: "1 0 auto",height: "100vh",overflowY: "hidden",}}>
        <SidebarMenu />
        <div style={{ padding: "20px" }} className="container1 container-fluid">
          <div className="container removegutter container3">
            <h1>Dashboard</h1>
            <p>Overview</p>
          </div>

          <div className="container d-lg-inline-flex removegutter cc1">
            <CDBCard className="compact-card cc1  " title="11.8M">
              <p className="ccp1">Total Patient</p>
              <div className="d-flex align-items-center justify-content-between">
                <h2 className="cch2 mb-0">10000</h2>
                <CDBBadge size="small" borderType="pill" className="btn1 ms-2 mb-0 d-flex align-items-center">
                  <p className="mb-0 mx-auto">+2.5</p>
                </CDBBadge>
              </div>
            </CDBCard>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard
