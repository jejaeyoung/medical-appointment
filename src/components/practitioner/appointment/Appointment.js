import axios from "axios";
import { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Appointment.css';

const Appointment =()=>{
const [allPatient,setAllpatient] = useState([]);
const [thePatient,setThepatient] = useState({});

    const [pname,setPname]=useState("");
    const [pschedule,setPschedule]=useState("");
    const [pemail,setPemail]=useState("");
    const [ptemp,setPtemp]=useState(0);
    const [pbloodtype,setPbloodtype]=useState("");
    const [phealthstatus,setPhealthstatus]=useState("");
    const [paction,setPaction]=useState("");

    useEffect(()=>{
        axios.get("http://localhost:8000/api/patient/all")
        .then((res)=>{
            console.log(res.data.thePatient);
            setAllpatient(res.data.thePatient);
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    return(
       <>
       <div > 
       <h1 className="Appointment"> Appointment </h1>
       <ul className="Tab">
        Appointment   Your Patient   Overview
        </ul>
        <td><div class="appointmentbox"> Total Patient 11,450 <span class="number"> 99+</span>  </div> </td>
        <td> <div class="appointmentbox2"> New Patient 11,450 <span class="number"> 99+</span>  </div></td>
        <td><div class="appointmentbox3"> Total Patient  11,450 <span class="number"> 99+</span>  </div></td>

       <table>
        <thead>
          <tr>
            <th>Name </th>
            <th>Schedule</th>
            <th>Email</th>
            <th>Temperature</th>
            <th>Blood Type</th>
            <th>Health Status</th>
            <th>Action  </th>
            
          </tr>
        </thead>
        {allPatient.map((element,index)=>{
               return (<p key={index}> 
               <Link to={"/patient/"+element.p_name}>{element.p_name} </Link></p>) 
            })}
        </table>
       </div>
       </>
    )

}

  export default Appointment;
