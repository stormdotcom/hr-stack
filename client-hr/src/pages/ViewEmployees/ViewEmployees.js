import React, {useEffect, useState} from 'react';
import "./styles.css"
import NavBar from "../../components/NavBar/NavBar"
import NameCard from '../../components/NameCard/NameCard';
import {getAllEmployees} from "../../api/api"
import {Alert} from "@mui/material"
import { useNavigate } from 'react-router-dom';
function ViewEmployees() {
    const navigate = useNavigate
    const [employees, setEmployyes] = useState([])
    const [err, seterr] = useState(null)
    useEffect(() => {
        getAllEmployees().then(res=> setEmployyes(res.data))
        .catch(err=> seterr(err.message))
        
      }, [navigate]);

  return <>
        <div className='viewPay'>
            <div className=' mx-auto'> 
            {err &&  <div className='flex'><Alert severity="error"></Alert> </div>}
           
            <h4 className='font-semibold mt-3 mb-2 text-center'>All Employees</h4> 
            <div className='flex p-10 justify-center flex-wrap'>
               {employees.map((ele, i)=>{
                   return (
                    <NameCard 
                    fullname={ele.fullname} 
                    empID={ele.empID} 
                    desigination={ele?.Designation?.name} 
                    key={i} 
                    cardID={ele.userID} />
                   )
               })}
                
               </div>
            </div>
         
        </div>

      <NavBar />
  </>;
}

export default ViewEmployees;
