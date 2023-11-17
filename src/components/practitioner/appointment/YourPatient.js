import axios from "axios";
import { useEffect,useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './OnePatient.css';

const YourPatient =()=>{
    const navigate = useNavigate();
    const [thePatient,setThepatient] = useState({});
    const {pname}=useParams();
    
    useEffect(()=>{
        axios.get("http://localhost:8000/api/patient/"+pname)
        .then((res)=>{
            console.log(res.data.thePatient);
            setThepatient(res.data.thePatient);
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    const deletePatient=(pid)=>{
        const resp = window.confirm("Do you really want to delete?");
        if(resp)
        {
            axios.delete("http://localhost:8000/api/patient/delete/"+pid)
            .then((response)=>{
                console.log(response.data);
                navigate("/");
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }
    const acceptPatient=(pid)=>{
        const resp = window.confirm("You accept this patient");
        if(resp)
        {
            axios.delete("http://localhost:8000/api/patient/accept/"+pid)
            .then((response)=>{
                console.log(response.data);
                navigate("/");
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }
    return(
        <>
        <div className="OnePatient"> 
        <h1> YourPatient </h1>
        <table className="PatientInfo"> 
            <tr> 
            <th className="Header">Patient Name: <td> {thePatient.p_name} </td> </th>
            <th className="Header">Schedule: <td> {thePatient.p_schedule} </td> </th>
            <th className="Header">Email: <td> {thePatient.p_email} </td> </th>
            <th className="Header">Temperature:<td> {thePatient.p_temp } </td> </th>
            <th className="Header">Blood type: <td> {thePatient.p_bloodtype} </td> </th>
            <th className="Header">Health Status: <td> {thePatient.p_healthstatus} </td> </th>
            <th className="Header">Action: <td> {thePatient.p_action} 
            <button onClick={()=>{acceptPatient(thePatient.p_name)}}>ACCEPT</button>
            <button onClick={()=>{deletePatient(thePatient._id)}}>DECLINE</button></td> </th>
            
            
            </tr>
           
        </table>
        </div>
        </>
    )
}
export default YourPatient;