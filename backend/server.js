const express = require("express");
const app = express();
const port = 8000;  

require("./config/mongoose")
require('dotenv').config();

const cors = require("cors");

app.use(express.json(), express.urlencoded({ extended: true }),cors());
 
//routes
const DoctorRoutes = require("./doctor/doctor_routes");
DoctorRoutes(app);
const PatientRoutes = require("./patient/patient_routes");
PatientRoutes(app);
const MedicalSecretaryRoutes = require("./medicalsecretary/medicalsecretary_routes");
MedicalSecretaryRoutes(app);

app.listen(port, () => console.log("The server is all fired up on port 8000"));

