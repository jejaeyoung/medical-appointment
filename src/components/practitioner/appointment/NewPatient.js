import axios from "axios";
import { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewPatient =()=>{
    const navigate = useNavigate();
    const [pname,setPname]=useState("");
    const [pschedule,setPschedule]=useState("");
    const [pemail,setPemail]=useState("");
    const [ptemp,setPtemp]=useState(0);
    const [pbloodtype,setPbloodtype]=useState("");
    const [phealthstatus,setPhealthstatus]=useState("");
    const [paction,setPaction]=useState("");

    const registerPatient=()=>{
        
        const newP = {
            p_name:pname,
            p_schedule:pschedule,
            p_email:pemail,
            p_temp:ptemp,
            p_bloodtype:pbloodtype,
            p_healthstatus:phealthstatus,
            p_action:paction
        }
        axios.post("http://localhost:8000/api/patient/new",newP)
        .then((response)=>{
            console.log(response.data);
            navigate("/")
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return(
        <>
            <h1>Appointment Patient</h1>
            <hr/>
            <p>Patient Name:<input type="text" onChange={(e)=>{setPname(e.target.value)}}/></p>
            <p>Schedule:<input type="text" onChange={(e)=>{setPschedule(e.target.value)}}/></p>
            <p>Email:<input type="text" onChange={(e)=>{setPemail(e.target.value)}}/></p>
            <p>Temperature:<input type="number" onChange={(e)=>{setPtemp(e.target.value)}}/></p>
            <p>Bloodtype:<input type="text" onChange={(e)=>{setPbloodtype(e.target.value)}}/></p>
            <p>Health Status:<input type="text" onChange={(e)=>{setPhealthstatus(e.target.value)}}/></p>
            <p>Action <input type="text" onChange={(e)=>{setPaction(e.target.value)}}/></p>
            <p><button onClick={()=>{registerPatient()}}>REGISTER</button></p>
        </>
    )
}
export default NewPatient;