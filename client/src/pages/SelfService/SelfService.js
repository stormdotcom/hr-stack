import React from 'react'
import "./styles.css"
import Navbar from "../../components/NavBar/NavBar"
import {BiTransfer} from "react-icons/bi"
import {ImExit} from "react-icons/im"
import {AiFillCar} from "react-icons/ai"
import {FaFileInvoiceDollar} from "react-icons/fa"
import {MdDevices, MdManageAccounts} from "react-icons/md"
import { useNavigate} from 'react-router-dom'
import {useSelector} from "react-redux"
 import Swal from "sweetalert2"
function SelfService() {
    const navigate = useNavigate()
    const {data} =useSelector(state => state.employee)
    return (
        <div>
            <div className='selfService'>
                <div className='mx-auto selfServicesCard'>
                <div onClick={()=> {navigate("/selfservice/separation")}} className='button-4  selfServiceCard  sm:w-full xs:w-3/4 md:w-5/12 '> <ImExit className='mx-auto md:text-4xl text-fourth'/>  <p >  Separation </p></div>
                <div onClick={()=> {navigate("/selfservice/transfer")}} className='button-4 selfServiceCard  sm:w-full  xs:w-3/4 md:w-5/12 '> <BiTransfer className='mx-auto md:text-4xl text-fourth'/> <p >  Transfer </p></div>
                <div onClick={()=> {navigate("/selfservice/viewslip")}} className='button-4 selfServiceCard sm:w-full xs:w-3/4 md:w-5/12'> <FaFileInvoiceDollar className='mx-auto md:text-4xl text-fourth'/><p> View PaySlip </p></div>
                <div onClick={()=> {navigate("/selfservice/vehicle")}} className='button-4 selfServiceCard sm:w-full  xs:w-3/4 md:w-5/12'><AiFillCar className='mx-auto md:text-4xl text-fourth'/> <p >Vehicle Requests </p></div>
                <div onClick={()=> {navigate("/selfservice/assets")}} className='button-4 selfServiceCard sm:w-full  xs:w-3/4 md:w-5/12'> <MdDevices className='mx-auto md:text-4xl text-fourth'/> <p> Assets</p></div>
                {data?.Designation?.isManager ? <div onClick={()=> {navigate("/selfservice/all-requests")}} className='button-4 selfServiceCard sm:w-full xs:w-full md:w-5/12'><MdManageAccounts className='mx-auto  md:text-4xl text-fourth'/> <p>Manage Request </p></div> :
                  <div onClick={()=> {Swal.fire( 'Access Denied', 'You are not authorized to access this page?', 'info' )}} className='button-4 selfServiceCard sm:w-full xs:w-full md:w-5/12'><MdManageAccounts className='mx-auto  md:text-4xl text-fourth'/> <p>Manage Request  <small>(for managers)</small></p></div>}
               
                </div>
            </div>
            <Navbar />
        </div>
    )
}

export default SelfService
