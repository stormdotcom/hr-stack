import React, {useEffect, useState} from 'react';
import "./styles.css"
import NavBar from "../../components/NavBar/NavBar"
import NameCard from '../../components/NameCard/NameCard';
import {getAllManagers} from "../../api/api"
import {Alert} from "@mui/material"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function ViewManagers() {
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([])
    const [err, seterr] = useState(null)
    useEffect(() => {
        getAllManagers().then(res=> setEmployees(res.data))
        .catch(err=> seterr(err.message))
        return (()=> setEmployees([]))
      }, [navigate]);

  return <>
        <div className='viewPay'>
            <div className=' mx-auto'> 
            {err &&  <div className='flex'><Alert severity="error"></Alert> </div>}
           
            <nav className="rounded-md w-full">
  <ol className="list-reset flex">
    <li> <Link to="/view-employees">Employees </Link></li>
    <li><span className="text-gray-500 mx-2">/</span></li>
    <li className="text-gray-500">Managers</li>
  </ol>
</nav>
            <div className='flex space-x-1'> 
            <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/view-employees')}} > All Employees</div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/view-employees/view-skills')}}> Skills View</div>
                <div className='button-5 font-semibold text-sm my-1' style={{backgroundColor:"#3283bd"}} onClick={()=>{navigate('/view-employees/managers')}}>  Managers</div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/view-employees/performer')}}> Performers </div>
             </div>
             <div className='flex p-10 justify-center flex-wrap'>
               {employees.map((ele, i)=>{
                   return (
                    <NameCard 
                    selectedFile={ele.selectedFile}
                    fullname={ele.fullname} 
                    empID={ele.empID} 
                    desigination={ele?.Designation?.name} 
                    project={`Manager: ${ele.projectAllocated?.Project}`}
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

export default ViewManagers;
