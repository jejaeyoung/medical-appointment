import React from 'react'
import { useParams } from 'react-router-dom';
import MedSecNavbar from '../navbar/MedSecNavbar';

function MedSecDashboard() {
    const { msid } = useParams();
  return (
    <>
       <MedSecNavbar/>
    </>
  )
}

export default MedSecDashboard