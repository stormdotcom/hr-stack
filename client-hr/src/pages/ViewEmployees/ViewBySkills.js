import React, {useEffect, useState} from 'react';
import "./styles.css"
import NavBar from "../../components/NavBar/NavBar"
import SkillCard from '../../components/SkillCard/SkillCard';
import {getAllEmployeesBySkills} from "../../api/api"
import {Alert} from "@mui/material"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function ViewBySkills() {
    const navigate = useNavigate()
    const [employees, setEmployyes] = useState([])
    const [err, seterr] = useState(null)
    useEffect(() => {
        getAllEmployeesBySkills().then(res=> setEmployyes(res.data))
        .catch(err=> seterr(err.message))
        
      }, [navigate]);

  return <>
        <div className='viewPay'>
            <div className=' mx-auto'> 
            {err &&  <div className='flex'><Alert severity="error"></Alert> </div>}
           
            <nav className="rounded-md w-full">
  <ol className="list-reset flex">
    <li> <Link to="/view-employees">Employees </Link></li>
    <li><span className="text-gray-500 mx-2">/</span></li>
    <li className="text-gray-500">Skills</li>
  </ol>
</nav>
            <div className='flex space-x-1'> 
            <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/view-employees')}} > All Employees</div>
                <div className='button-5 font-semibold text-sm my-1' style={{backgroundColor:"#3283bd"}} onClick={()=>{navigate('/view-employees/view-skills')}}> Skills View</div>
                <div className='button-5 font-semibold text-sm my-1' onClick={()=>{navigate('/view-employees/managers')}}> Managers</div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/view-employees/performer')}}> Performers </div>
             </div>
            <div className='flex p-10 justify-center flex-wrap'>
               {employees.map((ele, i)=>{
                   return (
                    <SkillCard 
                    userID={ele.userID}
                    selectedFile={ele.selectedFile}
                    fullname={ele.fullname} 
                    empID={ele.empID} 
                    desigination={ele?.Designation?.name} 
                    key={i} 
                    skills={ele.skillSets} />
                   )
               })}
                
               </div>
            </div>
         
        </div>

      <NavBar />
  </>;
}

export default ViewBySkills;
