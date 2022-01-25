import React from 'react';
import {FaUserAlt} from "react-icons/fa"
import "./styles.css"
import {useNavigate, useParams} from "react-router-dom"
function NameCard( {fullname, empID, desigination, img, cardID}) {
  const navigate = useNavigate()
  return <div className='flex justify-space nameCard' onClick={()=>{navigate(`/view-employees/${cardID}`)}}>
    <div className='flex justify-center items-center mx-auto my-auto p5 ml-auto'> <FaUserAlt  size="50px" /> </div>
    <div className='flex flex-col pl-4'> 
        <h6 className='truncate font-bold text-base'> {fullname} </h6>
        <h6 className='truncate font-semibold text-sm'> {empID}</h6>
        <p className='font-semibold text-sm'> {desigination}</p>
    </div>
  </div>;
}

export default NameCard;
    