import React, { useEffect, useState } from "react";
import SidebarMenu from "../sidebar/SidebarMenu";
import { CDBCard, CDBBadge } from "cdbreact";
import "./Dashboard.css";


import * as Icon from "react-bootstrap-icons";


import { Dropdown } from 'react-bootstrap';
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {

  const [thePost, setThePost] = useState("");
  const [allPost, setAllPost] = useState([]);
  const submitPost = (e) => {
    //validations for posting
    if (thePost.length > 3) {
      setAllPost((prevPosts) => [...prevPosts, thePost]);
    }

    e.preventDefault();
  };

  const [postDropdowns, setPostDropdowns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dropdowns = allPost.map(() => false);
    setPostDropdowns(dropdowns);
  }, [allPost]);

  const handleDropdownToggle = (index) => {
      const updatedDropdowns = postDropdowns.map((dropdown, i) => {
      return index === i ? !dropdown : false;
  });
  setPostDropdowns(updatedDropdowns);
  };

  const handleEditClick = (index) => {
    navigate(`/practitioner/dashboard/edit`);
    setPostDropdowns(postDropdowns.map((dropdown, i) => index === i ? false : dropdown));
  };

  const handleDeleteClick = (index) => {
    setAllPost(allPost.filter((post, i) => index !== i));
    setPostDropdowns(postDropdowns.filter((i) => index !== i));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flex: "1 0 auto",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <SidebarMenu />

        <div
          style={{ padding: "20px", overflowY: "auto", overflowX: "hidden" }}
          className="container1 container-fluid "
        >
          <div className="removegutter">
            <h1 className="dashboard-title">Dashboard</h1>
            <p>Overview</p>
          </div>

          <div className="container-fluid d-lg-inline-flex removegutter cc1 cont ">
            <CDBCard className="compact-card cc1 m-2 " title="11.8M">
              <p className="ccp1">Total Patient</p>
              <div className="d-flex align-items-center justify-content-between">
                <h2 className="cch2 mb-0">10000</h2>
                <CDBBadge
                  size="small"
                  borderType="pill"
                  className="btn1 ms-2 mb-0 d-flex align-items-center"
                >
                  <p className="mb-0 mx-auto">+2.5</p>
                </CDBBadge>
              </div>
            </CDBCard>
            <CDBCard className="compact-card cc1 m-2  " title="11.8M">
              <p className="ccp1">New Patient</p>
              <div className="d-flex align-items-center justify-content-between">
                <h2 className="cch2 mb-0">10000</h2>
                <CDBBadge
                  size="small"
                  borderType="pill"
                  className="btn1 ms-2 mb-0 d-flex align-items-center"
                >
                  <p className="mb-0 mx-auto">+2.52</p>
                </CDBBadge>
              </div>
            </CDBCard>
            <CDBCard className="compact-card cc1 m-2  " title="11.8M">
              <p className="ccp1">Tracked Health</p>
              <div className="d-flex align-items-center justify-content-between">
                <h2 className="cch2 mb-0">1234560</h2>
                <CDBBadge
                  size="small"
                  borderType="pill"
                  className="btn1 ms-2 mb-0 d-flex align-items-center"
                >
                  <p className="mb-0 mx-auto">+2.5224</p>
                </CDBBadge>
              </div>
            </CDBCard>
          </div>

          <div className=" removegutter container4 container-fluid ">
            <h1 className="dashboard-title">Post Announcement</h1>
            <hr className=" divider d-lg" />
          </div>

          <div>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Create Post</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setThePost(e.target.value);
                  }}
                  as="textarea"
                  rows={4}
                  placeholder="What's on your mind?"
                />
              </Form.Group>
              <div className="  d-lg-inline-flex removegutter container4 container-fluid justify-content-end ">
                <Button onClick={submitPost} variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
            <hr className=" divider d-lg" />
          </div>

          <div>
            <h3>Posted Announcements:</h3>
            <hr className=" divider d-lg" />

            <div>
              {allPost.reverse().map((post, index) => (
              <div key={post}>
                <div className="d-flex align-items-center justify-content-between">
                  <li key={index}>{post}</li>
                  <Dropdown show={postDropdowns[index]} onToggle={() => handleDropdownToggle(index)}>
                    <Dropdown.Toggle variant="link" className="text-decoration-none">
                      <Icon.ThreeDots className="threedots" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleEditClick(index)}>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDeleteClick(index)}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <hr className="divider d-lg" />
              </div>
              ))}
            </div>
          </div>
        </div>

          <div className="container thirdcontainer">
        Right side bar
        </div>
      </div>
    </>
  );
}

export default Dashboard;
