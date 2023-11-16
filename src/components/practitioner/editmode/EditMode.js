import React, { useState } from "react";
import SidebarMenu from "../sidebar/SidebarMenu";
import { CDBCard, CDBBadge } from "cdbreact";

import "./EditMode.css";

import * as Icon from "react-bootstrap-icons";



import { Container, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
function EditMode() {
  const { userId } = useParams();
  const [newPost, setNewPost] = useState("");
  return (
    <>
        <div style={{display: "flex",flex: "1 0 auto",height: "100vh",overflowY: "hidden",}}>
            <SidebarMenu/>

            <div className="container">
              <h1>Edit Your Post</h1>
       


              <div>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Create Post</Form.Label>
                <Form.Control  as="textarea" rows={4} placeholder="What's on your mind?"/>
              </Form.Group>
              <div className="  d-lg-inline-flex removegutter container4 container-fluid justify-content-end ">
                <Button  variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
            <hr className=" divider d-lg" />
          </div>

            </div>

            
        </div>
        
    </>
  )
}

export default EditMode