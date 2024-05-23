import React, { useEffect, useState } from "react";
import SidebarMenu from "../sidebar/SidebarMenu";
import { CDBCard, CDBBadge } from "cdbreact";
import "./Dashboard.css";

import * as Icon from "react-bootstrap-icons";

import { Dropdown } from "react-bootstrap";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  //to store the state
  const { uid, role } = useParams();

  const [thePost, setThePost] = useState([]);

  const [postDropdowns, setPostDropdowns] = useState([]);
  const [thePosts, setThePosts] = useState([]);

  const [theId, setTheId] = useState("");

  const [theName, setTheName] = useState("");
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(thePosts)) {
      const dropdowns = thePosts.map(() => false);
      setPostDropdowns(dropdowns);
    }
  }, [thePosts]);

  const handleDropdownToggle = (index) => {
    const updatedDropdowns = postDropdowns.map((dropdown, i) => {
      return index === i ? !dropdown : false;
    });
    setPostDropdowns(updatedDropdowns);
  };

  //Setting a State for Id
  axios
    .get(`http://localhost:8000/doctor/api/finduser/` + uid)
    .then((res) => {
      setTheId(res.data.theDoctor._id);
      setTheName(res.data.theDoctor.dr_firstName);
    })
    .catch((err) => {
      console.log(err);
    });

  //deleting post
  const deletePost = (index) => {
    axios
      .delete(
        `http://localhost:8000/doctor/api/post/deletepost/${uid}/` + index
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //display all posts
  useEffect(() => {
    axios
      .get(`http://localhost:8000/doctor/api/post/getallpost/${uid}`)
      .then((res) => {
        console.log(res);
        setThePosts(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //creating new post
  const submitPost = (e) => {
    if (thePost.length > 3) {
      axios
        .post("http://localhost:8000/doctor/api/addpost/" + uid, {
          content: thePost,
        })
        .then((res) => {
          setThePosts([...thePosts, thePost]);
          setThePost("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const editPost = (id, index) => {
    setSelectedPostIndex(index);
    navigate(`/dashboard/edit/${theId}/` + index);
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
        <SidebarMenu p_name={theName} uid={theId} />

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
                  value={thePost}
                  onChange={(e) => {
                    setThePost(e.target.value);
                  }}
                  as="textarea"
                  rows={4}
                  placeholder="What's on your mind?"
                />
              </Form.Group>
              <div className="  d-lg-inline-flex removegutter container4 container-fluid justify-content-end ">
                <Button
                  onClick={() => {
                    submitPost();
                  }}
                  variant="primary"
                  type="submit"
                >
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
                    <li className="list-unstyled decoration-none" key={index}>
                      {post.content}
                    </li>

                    <Dropdown
                      show={postDropdowns[index]}
                      onToggle={() => handleDropdownToggle(index)}
                    >
                      <Dropdown.Toggle
                        variant="link"
                        className="text-decoration-none"
                      >
                        <Icon.ThreeDots className="threedots" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => editPost(post._id, index)}
                        >
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => deletePost(index)}>
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <hr className="divider d-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container thirdcontainer"></div>
      </div>
    </>
  );
}

export default Dashboard;
