import React, { useEffect, useState } from "react";
import SidebarMenu from "../sidebar/SidebarMenu";
import { CDBCard, CDBBadge } from "cdbreact";
import "./Dashboard.css";


import * as Icon from "react-bootstrap-icons";


import { Dropdown } from 'react-bootstrap';
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  //to store the state
  
  const [thePost, setThePost] = useState("");

  const [postDropdowns, setPostDropdowns] = useState([]);
  const [thePosts, setThePosts] = useState([]);

  const [theId, setTheId] =useState("");
  const navigate = useNavigate();



  useEffect(() => {
    const dropdowns = thePosts.map(() => false);
    setPostDropdowns(dropdowns);
  }, [thePosts]);

  const handleDropdownToggle = (index) => {
      const updatedDropdowns = postDropdowns.map((dropdown, i) => {
      return index === i ? !dropdown : false;
  });
    setPostDropdowns(updatedDropdowns);
  };

  const editPost = (index) => {
    navigate(`/practitioner/dashboard/edit/${theId}`);
    
  };

 //Setting a State for Id
 axios.get(`http://localhost:8000/api/medapp/finduser/6554ed67204615e200e4c204`)
 .then((res) => {
   console.log(res.data.theUser._id)
   setTheId(res.data.theUser._id)
 })
 .catch((err) => {
   console.log(err);
 });

  //deleting post
  const deletePost = (index) => {
    axios.delete(`http://localhost:8000/api/medapp/post/deletepost/${theId}/`+index)
        .then((res) => {
          console.log(res)
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
  };

  //display all posts
  useEffect(() => {
    axios.get(`http://localhost:8000/api/medapp/post/getallpost/6554ed67204615e200e4c204`)
      .then((res) => {
        console.log(res.data.posts);
        setThePosts(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //creating new post
  const submitPost = (e) => {
    if (thePost.length > 3) {
      axios.post("http://localhost:8000/api/medapp/addpost/6554ed67204615e200e4c204", {
        email: 'dasdad@gmail.com', // Replace with the user's email
        post: thePost
      })
      .then((res) => {
        setThePosts([...thePosts, thePost]); // Update the frontend with the new post
        setThePost(""); // Clear the input field after submitting
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };




  return (
    <>
      <div
        style={{display: "flex", flex: "1 0 auto", height: "100vh", overflowY: "hidden",}}
      >
        <SidebarMenu />

        <div style={{ padding: "20px", overflowY: "auto", overflowX: "hidden" }} className="container1 container-fluid ">
          
          <div className="removegutter">
            <h1 className="dashboard-title">Dashboard</h1>
            <p>Overview</p>
          </div>

          <div className="container-fluid d-lg-inline-flex removegutter cc1 cont ">
            <CDBCard className="compact-card cc1 m-2 " title="11.8M">
              <p className="ccp1">Total Patient</p>
              <div className="d-flex align-items-center justify-content-between">
                <h2 className="cch2 mb-0">10000</h2>
                <CDBBadge size="small" borderType="pill" className="btn1 ms-2 mb-0 d-flex align-items-center">
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
                <Form.Control value={thePost} onChange={(e) => {setThePost(e.target.value)}} as="textarea" rows={4} placeholder="What's on your mind?"/>
              </Form.Group>
              <div className="  d-lg-inline-flex removegutter container4 container-fluid justify-content-end ">
                <Button onClick={()=>{submitPost()}} variant="primary" type="submit">
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
            {thePosts.map((post, index) => (
              <div key={index}>
                <div className="d-flex align-items-center justify-content-between">
                  <li key={index}>{post}</li>
                  
                  <Dropdown show={postDropdowns[index]} onToggle={() => handleDropdownToggle(index)}>
                    <Dropdown.Toggle variant="link" className="text-decoration-none">
                      <Icon.ThreeDots className="threedots" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => editPost(post._id)}>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => deletePost(index)}>Delete</Dropdown.Item>
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
