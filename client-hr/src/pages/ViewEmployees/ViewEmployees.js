import React, {useEffect, useState} from 'react';
import "./styles.css"
import NavBar from "../../components/NavBar/NavBar"
import NameCard from '../../components/NameCard/NameCard';
import {getAllEmployees} from "../../api/api"
import {Alert} from "@mui/material"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function ViewEmployees() {
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([])
    const [err, seterr] = useState(null)
    useEffect(() => {
        getAllEmployees().then(res=> setEmployees(res.data))
        .catch(err=> seterr(err.message))
        return (()=> setEmployees([]))

      }, [navigate]);
  return <>
        <div className='viewPay'>
            <div className=' mx-auto'> 
            {err &&  <div className='flex justify-center'><Alert severity="error"> {err}</Alert> </div>}
           
            <nav className="rounded-md w-full">
  <ol className="list-reset flex">
    <li> <Link to="/view-employees">Employees </Link></li>
    <li><span className="text-gray-500 mx-2">/</span></li>
    <li className="text-gray-500"></li>
  </ol>
</nav>
            <div className='flex space-x-1'> 
            <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/view-employees')}} style={{backgroundColor:"#3283bd"}}> All Employees</div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/view-employees/view-skills')}}> Skills View</div>
                <div className='button-5 font-semibold text-sm my-1' onClick={()=>{navigate('/view-employees/managers')}}>  Managers</div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/view-employees/performer')}}> Performers </div>
             </div>
            <div className='flex p-10 justify-center flex-wrap'>
               {employees.map((ele, i)=>{
                   return (
                     <div className='border p-2 rounded-md m-1'>
                    <NameCard 
                    selectedFile={ele.selectedFile}
                    fullname={ele.fullname} 
                    empID={ele.empID} 
                    desigination={ele?.Designation?.name} 
                    project={ele?.projectAllocated.Project}
                    key={i} 
                    cardID={ele.userID} />
                    <div className='flex justify-evenly'>
                    <div className='text-sm button-sm-1' onClick={()=>navigate(`/change-position/${ele.userID}`) }> Change Desigination </div>
                     <div className='text-sm button-sm-1' onClick={()=>navigate(`/change-project/${ele.userID}`) }> Allocate Project</div>
                       </div>
                     
                    </div>
                   )
               })}
                
               </div>
            </div>
         
        </div>

      <NavBar />
  </>;
}

export default ViewEmployees;
