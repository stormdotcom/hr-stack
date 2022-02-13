import React, {useEffect, useState} from 'react';
import "./styles.css"
import NavBar from "../../components/NavBar/NavBar"
import NameCard from '../../components/NameCard/NameCard';
import {getPerformer, unsetPerformer} from "../../api/api"
import {Alert} from "@mui/material"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function ViewPerfomer() {
    const navigate = useNavigate()
    const [err, seterr] = useState(null)
    const [performer, setPerformer] = useState(null)
    useEffect(() => {
        getPerformer().then(res=> setPerformer(res.data))
        .catch(err=> seterr(err.message))
        return (()=> setPerformer([]))
      }, [navigate]);

  return <>
        <div className='viewPay'>
            <div className=' mx-auto'> 
            {err &&  <div className='flex'><Alert severity="error"></Alert> </div>}
           
            <nav className="rounded-md w-full">
  <ol className="list-reset flex">
    <li> <Link to="/view-employees">Employees </Link></li>
    <li><span className="text-gray-500 mx-2">/</span></li>
    <li className="text-gray-500">Performers of this Month</li>
  </ol>
</nav>
            <div className='flex space-x-1'> 
            <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/view-employees')}} > All Employees</div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/view-employees/view-skills')}}> Skills View</div>
                <div className='button-5 font-semibold text-sm my-1' onClick={()=>{navigate('/view-employees/managers')}}>  Managers</div>
                <div className='button-5 font-semibold text-sm my-1'  style={{backgroundColor:"#3283bd"}} onClick={()=>{navigate('/view-employees/performer')}}> Performers </div>
             </div>
             {performer &&             <div className='flex p-10 justify-center flex-wrap'>
               {performer.map((ele, i)=>{
                   return (
                       <div className='border p-2 rounded-md'>
                    <NameCard 
                    selectedFile={ele.selectedFile}
                    fullname={ele.fullname} 
                    empID={ele.empID} 
                    desigination={ele?.Designation?.name} 
                    project={`Manager: ${ele.projectAllocated?.Project}`}
                    key={i} 
                    cardID={ele.userID} />
                    <div className='text-sm button-sm-1' onClick={()=>unsetPerformer({userID:ele.userID}) }> Remove from List </div>
                    </div>
                   )
               })}
                
               </div>}
 
            </div>
         
        </div>

      <NavBar />
  </>;
}

export default ViewPerfomer;
