import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Button, Form, Container, Card } from "react-bootstrap";
import PasswordValidation from "./PasswordValidation";
import "./SignUp.css";

const NewSignUp = () => {
    const navigate = useNavigate();
    const [ufirstName, setfirstName] = useState("");
    const [uLastName, setLastName] = useState("");
    const [uAge, setAge] = useState(0);
    const [uMiddleInitial, setMiddleInitial] = useState("");
    const [uemail, setemail] = useState("");
    const [uBirth, setBirth] = useState("");
    const [upassword, setPass] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [uNumber, setNumber] = useState("");
    const [uGender, setGender] = useState("Male");
    const [urole, setURole] = useState("Patient");

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        birth: "",
        number: "",
    });

    const validateFirstName = (name) => {
        if (!name) return "First name is required";
        return "";
    };

    const validateLastName = (name) => {
        if (!name) return "Last name is required";
        return "";
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return "Email is required";
        if (!emailRegex.test(email)) return "Email is not valid";
        return "";
    };

    const validatePassword = (password) => {
        const passwordRules = [
            { test: password.length >= 8, message: "Password should be at least 8 characters long" },
            { test: /[!@#$%^&*(),.?":{}|<>]/.test(password), message: "Password should contain a special character" },
            { test: /[A-Z]/.test(password), message: "Password should contain at least one uppercase letter" },
            { test: /[a-z]/.test(password), message: "Password should contain at least one lowercase letter" },
        ];

        const failedRule = passwordRules.find(rule => !rule.test);
        return failedRule ? failedRule.message : "";
    };

    const validateConfirmPassword = (password, confirmPassword) => {
        if (!confirmPassword) return "Please confirm your password";
        if (password !== confirmPassword) return "Passwords do not match";
        return "";
    };

    const validateBirth = (birth) => {
        if (!birth) return "Date of birth is required";
        return "";
    };

    const validateNumber = (number) => {
        if (!number) return "Contact number is required";
        if (!/^\d+$/.test(number)) return "Contact number must be numeric";
        return "";
    };

    const handleBlur = (field, value) => {
        let error = "";
        switch (field) {
            case "firstName":
                error = validateFirstName(value);
                break;
            case "lastName":
                error = validateLastName(value);
                break;
            case "email":
                error = validateEmail(value);
                break;
            case "password":
                error = validatePassword(value);
                break;
            case "confirmPassword":
                error = validateConfirmPassword(upassword, value);
                break;
            case "birth":
                error = validateBirth(value);
                break;
            case "number":
                error = validateNumber(value);
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    };

    const registerUser = () => {
        if (urole === "Practitioner") {
            const doctorUser = {
                dr_firstName: ufirstName,
                dr_lastName: uLastName,
                dr_middleInitial: uMiddleInitial,
                dr_email: uemail,
                dr_password: upassword,
                dr_dob: uBirth,
                dr_age: uAge,
                dr_contactNumber: uNumber,
                dr_gender: uGender,
            }
            axios.post('http://localhost:8000/doctor/api/signup', doctorUser)
                .then((response) => {
                    console.log(response);
                    window.alert("Successfully registered User");
                    navigate('/medapp/login');
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else if (urole === "Patient") {
            const patientUser = {
                patient_firstName: ufirstName,
                patient_middleInitial: uMiddleInitial,
                patient_lastName: uLastName,
                patient_email: uemail,
                patient_password: upassword,
                patient_dob: uBirth,
                patient_age: uAge,
                patient_contactNumber: uNumber,
                patient_gender: uGender,
            };
            console.log(patientUser)
            axios.post('http://localhost:8000/patient/api/signup', patientUser)
                .then((response) => {
                    console.log(response);
                    window.alert("Successfully registered User");
                    navigate('/medapp/login');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    useEffect(() => {
        if (uBirth) {
            const age = calculateAge(uBirth);
            setAge(age);
        }
    }, [uBirth]);

    return (
        <>
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Card className="container">
                    <Card.Body>
                        <div className="container">
                            <h1>Sign Up</h1>
                            <hr />
                            <Form>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formFName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter First Name"
                                            onBlur={(e) => handleBlur("firstName", e.target.value)}
                                            onChange={(e) => {
                                                setfirstName(e.target.value);
                                                handleBlur("firstName", e.target.value);
                                            }}
                                            isValid={errors.firstName === "" && ufirstName !== ""}
                                            isInvalid={errors.firstName !== ""}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formLName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Last Name"
                                            onBlur={(e) => handleBlur("lastName", e.target.value)}
                                            onChange={(e) => {
                                                setLastName(e.target.value);
                                                handleBlur("lastName", e.target.value);
                                            }}
                                            isValid={errors.lastName === "" && uLastName !== ""}
                                            isInvalid={errors.lastName !== ""}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formMName">
                                        <Form.Label>Middle Initial</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Middle Initial"
                                            onChange={(e) => setMiddleInitial(e.target.value)}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group as={Col} className="mb-3" controlId="formBirthDate">
                                        <Form.Label>Birthdate</Form.Label>
                                        <Form.Control
                                            type="date"
                                            placeholder="Enter Birthdate"
                                            onBlur={(e) => handleBlur("birth", e.target.value)}
                                            onChange={(e) => {
                                                setBirth(e.target.value);
                                                handleBlur("birth", e.target.value);
                                            }}
                                            isValid={errors.birth === "" && uBirth !== ""}
                                            isInvalid={errors.birth !== ""}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.birth}</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-3" controlId="formContactNumber">
                                        <Form.Label>Contact Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Contact Number"
                                            onBlur={(e) => handleBlur("number", e.target.value)}
                                            onChange={(e) => {
                                                setNumber(e.target.value);
                                                handleBlur("number", e.target.value);
                                            }}
                                            isValid={errors.number === "" && uNumber !== ""}
                                            isInvalid={errors.number !== ""}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.number}</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group as={Col} className="mb-3" controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter Email Address"
                                            onBlur={(e) => handleBlur("email", e.target.value)}
                                            onChange={(e) => {
                                                setemail(e.target.value);
                                                handleBlur("email", e.target.value);
                                            }}
                                            isValid={errors.email === "" && uemail !== ""}
                                            isInvalid={errors.email !== ""}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group className="mb-3" controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter Password"
                                            onBlur={(e) => handleBlur("password", e.target.value)}
                                            onChange={(e) => {
                                                setPass(e.target.value);
                                                handleBlur("password", e.target.value);
                                            }}
                                            isValid={errors.password === "" && upassword !== ""}
                                            isInvalid={errors.password !== ""}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                       
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm Password"
                                            onBlur={(e) => handleBlur("confirmPassword", e.target.value)}
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value);
                                                handleBlur("confirmPassword", e.target.value);
                                            }}
                                            isValid={errors.confirmPassword === "" && confirmPassword !== ""}
                                            isInvalid={errors.confirmPassword !== ""}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <PasswordValidation password={upassword} />                 
                                <Row>
                                    <Form.Group as={Col} controlId="formChooseGender">
                                        <Form.Label>Gender:</Form.Label>
                                        <Form.Select onChange={(e) => setGender(e.target.value)} defaultValue="Gender">
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formChoose">
                                        <Form.Label>Choose what to register:</Form.Label>
                                        <Form.Select onChange={(e) => setURole(e.target.value)} defaultValue="Choose">
                                            <option value="Patient">Patient</option>
                                            <option value="Practitioner">Practitioner</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Row>

                                <div className="d-lg-flex justify-content-between align-items-center mt-3">
                                    <div className="d-flex">
                                        <Button onClick={registerUser} variant="primary" type="button">
                                            Submit
                                        </Button>
                                    </div>
                                    <div className="mb-0">
                                        <Link to="/medapp/login">Already have an account?</Link>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default NewSignUp;
