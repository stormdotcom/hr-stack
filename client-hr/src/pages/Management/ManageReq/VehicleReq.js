import React from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import { useNavigate} from 'react-router-dom'
import {AiFillCaretRight} from "react-icons/ai"
import { Link } from 'react-router-dom'
import Swal from "sweetalert2"
import {useSelector} from "react-redux"
import moment from "moment"
import {cabDecline, cabApprove} from "../../../api/api"
import "./styles.css"
function VehicleReq() {
    const navigate = useNavigate()
    const {  cab } = useSelector((state) => state.requests);
    const handleView = (data, name, id, type) => {
        Swal.fire({
          title: "<strong>" + type + "</strong>",
          html:
            " <b>" +
            name +
            "</b> | " +
            " <b>" +
            id +
            "\n </b>" +
            "</br>" +
            "\n" +
            data +
            "\n",
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
        });
      };
      const handleApprove = (id)=>{
        Swal.fire({
            title: 'Are you sure want approve this Request?',
            showDenyButton: true,
            confirmButtonText: 'Approve',
            denyButtonText: `Close`,
          }).then(async (result) => {
            if (result.isConfirmed) {
                cabApprove(id).then(()=>{
                    Swal.fire('Approval Success!', '', 'success')
                }).catch((err)=>{
                    console.log(err.message)
                    Swal.fire('Failed to approve!', '', 'info')
                })

            } 
          })
    }
    const handleDecline =async (reqid)=>{
        let formData={}
        const { value: text } =  Swal.fire({
            input: 'textarea',
            inputLabel: 'Comment on Decline',
            inputPlaceholder: 'Type your Comment here...',
            inputAttributes: { 'aria-label': 'Type your Comment here' },
            showCancelButton: true,
            inputValidator: async (value) => {
              if (!value) {
                return 'You need to write Commment !'
              }
              console.log(text)
              formData={id:reqid, data:value} 
              cabDecline(formData)
              .then(res=> Swal.fire('Declined and updated!', '', 'success'))
              .catch(err=> Swal.fire('Fail Updating!', '', 'info'))
            }
          })     
    }
    return (
        <>
        <div className='viewPay'>
        <nav className="rounded-md w-full">
  <ol className="list-reset flex">
    <li> <Link to="/management">Management </Link></li>
    <li><span className="text-gray-500 mx-2">/</span></li>
    <li className="text-gray-500">Manage Requests</li>
  </ol>
  </nav>
        <div className="container my-5 tableView py-4 overflow-x-auto">
            <div className='button-groups'> 
            <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/management/all-requests')}} > All Requests</div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/management/all-requests/leave')}}> Leave Requests</div>
                <div className='button-5 font-semibold text-sm my-1' style={{backgroundColor:"#3283bd"}} onClick={()=>{navigate('/management/all-requests/vehicle')}}> Vehicle Requests</div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/management/all-requests/learnings')}}> Learnings </div>
                <div className='button-5 font-semibold text-sm my-1' style={{backgroundColor:"#3283bd"}} onClick={()=>{navigate('/management/all-requests/skills')}}> Skills Updation </div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/management/all-requests/seperation')}}> Separation Requests </div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/management/all-requests/transfer')}}> Transfer Requests </div>
             </div>
             <h6 className='font-bold ml-2 my-2 flex'>  All Requests <AiFillCaretRight className='mx-2' /> Vehicle Requests </h6>
             {cab.length ?   <table className="table-auto border-collapse  w-100 text-center rounded-2xl border border-gray-400">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Employee Name 
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Employee ID 
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Contact Number
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Pick-Up Location
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Drop Location 
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Requested Date
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Approved Status
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Comments
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white ">
                                {cab.map((ele, i)=>{
                                    return (
                                        <tr key={i} className="whitespace-nowrap">
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                        {ele.employeeName}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                            {ele.empID}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-500"> {ele.contactNumber} </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                        {ele.pickupPoint}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                        {ele.dropPoint}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                        {moment(ele.date).utcOffset("+05:30").format('DD-MM-YYYY')}
                                     
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                        {ele.approved ? "Approved" : "Pending"} 
                                        
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                        <div className='button-sm-1'         onClick={() =>
                                                handleView(
                                                ele.remarks,
                                                ele.employeeName,
                                                ele.employeeID,
                                                "Cab Request"
                                                )
                                            }> View</div>
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                    <div className='button-sm-1 text-sm my-1' onClick={()=>handleApprove(ele._id)}>Approve</div>
                                    <div className='button-sm-2 text-sm my-1' onClick={()=>handleDecline(ele._id)}>Deline</div>
                                    </td>
                        
                                    </tr>
                                    )
                                })}

                        
    
                        
                            </tbody>
                        </table> : 
                        <div className='flex justify-center'> <p>No Data</p> </div>}
                    </div>
        </div>
        <NavBar />
        </>
    )
}

export default VehicleReq
