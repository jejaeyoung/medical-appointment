import React, { useState } from "react";
import SidebarMenu from "../sidebar/SidebarMenu";
import { CDBCard, CDBBadge } from "cdbreact";


import * as Icon from "react-bootstrap-icons";


import { Dropdown } from 'react-bootstrap';
import { Container, Form, Button } from "react-bootstrap";
function EditMode() {
  return (
    <>
        <div style={{display: "flex",flex: "1 0 auto",height: "100vh",overflowY: "hidden",}}>
            <SidebarMenu/>
        </div>
    </>
  )
}

export default EditMode