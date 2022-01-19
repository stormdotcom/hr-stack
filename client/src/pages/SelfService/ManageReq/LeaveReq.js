import React from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import { useNavigate} from 'react-router-dom'
import moment from 'moment'
import {AiFillCaretRight} from "react-icons/ai"
import "./styles.css"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {leaveApprove, leaveDecline} from "../../../api/employee"
import Swal from "sweetalert2"
import { CircularProgress } from '@mui/material'
function LeaveReq() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { reqData} = useSelector(state => state.request)
    let isloading=false
    if(!reqData.length) isloading=true

    const handleApprove = (id, userID, fromDate, toDate, leaveType)=>{
        let formData = {id, userID, fromDate, toDate,leaveType,}
        Swal.fire({
            title: 'Are you sure want approve this Request?',
            showDenyButton: true,
            confirmButtonText: 'Approve',
            denyButtonText: `Close`,
          }).then(async (result) => {
            if (result.isConfirmed) {
                leaveApprove(formData).then(()=>{
                    Swal.fire('Approval Success!', '', 'success')
                }).catch((err)=>{
                    console.log(err.message)
                    Swal.fire('Failed to approve!', '', 'info')
                })

            } 
          })
    }
    const handleDecline =async (userID)=>{
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
              formData={userID:userID, data:value} 
              leaveDecline(formData)
              .then(res=> Swal.fire('Declined and updated!', '', 'success'))
              .catch(err=> Swal.fire('Fail Updating!', '', 'info'))
            }
          })     
    }
    const handleView = (data, name, id)=>{
        Swal.fire({
            title: '<strong>Leave Reason</strong>',
            html:
              ' <b>'+ name+ '</b> | ' +
              ' <b>'+ id + '\n'+ '</b>' +   
              '</br>'
              +"\n"+ data+  "\n",
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
          })
    }

    return (
        <>
        <div className='viewPay'>
 
            <nav className="rounded-md w-full">
            <ol className="list-reset flex">
            <li> <Link to="/selfservice">Self Services </Link></li>
            <li><span className="text-gray-500 mx-2">/</span></li>
            <li className="text-gray-500">Manage Requests</li>
        </ol>
         </nav>
        <div className="container my-5 tableView py-4 overflow-x-auto">
            <div className='button-groups'> 
            <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/selfservice/all-requests')}} > All Requests</div>
                <div className='button-5 font-semibold text-sm my-1' style={{backgroundColor:"#3283bd"}} onClick={()=>{navigate('/selfservice/all-requests/leave')}}> Leave Requests</div>
                <div className='button-5 font-semibold text-sm my-1' onClick={()=>{navigate('/selfservice/all-requests/vehicle')}}> Vehicle Requests</div>
                <div className='button-5 font-semibold text-sm my-1' onClick={()=>{navigate('/selfservice/all-requests/assets')}}> Assets Requests</div>
                <div className='button-5 font-semibold text-sm my-1' onClick={()=>{navigate('/selfservice/all-requests/learnings')}}> Learnings </div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/selfservice/all-requests/tickets')}}> View Tickets</div>
             </div>
             <h6 className='font-bold ml-2 my-2 flex'>  All Requests <AiFillCaretRight className='mx-2' /> Leave Requests </h6>
                        <table className="table-auto border-collapse  w-100 text-center rounded-2xl border border-gray-400">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Employee Name 
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Employee ID 
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Project
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Team
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Leave Type
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
                            {isloading ? <tbody><tr> <CircularProgress /> </tr> </tbody> : 
                                                        <tbody className="bg-white ">
                                                        {reqData.map((ele, i)=>{
                                                            return (
                                                                <tr className="whitespace-nowrap" key={i}>
                                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                                {ele.fullname}
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <div className="text-sm text-gray-900">
                                                                    {ele.empID}
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <div className="text-sm text-gray-500">{ele.projectName}</div>
                                                                </td>
                                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                               {ele.team}
                                                                </td>
                                                                <td className="text-sm px-6 py-4">
                                                                {ele.leaveType}
                                                                </td>
                                                                <td className="text-sm px-6 py-4">
                                                                {moment(ele.requestedDate).utc().format('DD-MM-YYYY')}   
                                                            
                                                                </td>
                                                                <td className="text-sm px-6 py-4">
                                                                {ele.approvedStatus ? "Approved" : "Pending"}
                                                                </td>
                                                                <td className="text-sm px-6 py-4">
                                                                <div className='button-sm-1 text-sm my-1' 
                                                                onClick={()=>handleView(ele.reason, ele.fullname, ele.empID)}>View</div>
                                                                </td>
                                                                <td className="text-sm px-6 py-4 flex-col ">
                                                                <div className='button-sm-1 text-sm my-1'
                                                                onClick={()=>handleApprove(ele._id, ele.userID, ele.fromDate, ele.toDate, ele.leaveType)}
                                                                >Approve</div>
                                                                <div className='button-sm-2 text-sm my-1'
                                                                onClick={()=>handleDecline(ele._id)}>Deline</div>
                                                                </td>
                                                            </tr>
                                                            );
                                                        })}
                                                    </tbody>
                            }

                        </table>
                    </div>
        </div>
        <NavBar />
        </>
    )
}

export default LeaveReq
