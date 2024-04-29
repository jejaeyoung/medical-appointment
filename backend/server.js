const express = require("express");
const app = express();
const port = 8000;  

require("./config/mongoose")
require('dotenv').config();

const cors = require("cors");
 
app.use(express.json(), express.urlencoded({ extended: true }),cors());
 
const AllMyUserRoutes = require("./routes/practitioner_routes");
AllMyUserRoutes(app);
   
app.listen(port, () => console.log("The server is all fired up on port 8000"));

app.get("/newuser", (req,res) => {
    res.render("signup")
})