import React, {useEffect, useState} from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import { useNavigate} from 'react-router-dom'
import {AiFillCaretRight} from "react-icons/ai"
import { Link } from 'react-router-dom'
import {getLeaveRequest} from "../../../api/employee"
import { initial, fetchRequest } from '../../../redux/requests/requestSlice'
import { useDispatch, useSelector } from 'react-redux'
import "./styles.css"
import { CircularProgress } from '@mui/material'
import Swal from "sweetalert2"
function ManageReq() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initial())
        getLeaveRequest().then(res=> dispatch(fetchRequest(res.data)))
        .catch(err=> console.log(err.message))
    }, [navigate])
    const {reqData} = useSelector(state => state.request)
    console.log(reqData)
    let isloading=false
    if(!reqData.length) isloading=true
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
            <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/selfservice/all-requests')}} style={{backgroundColor:"#3283bd"}}> All Requests</div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/selfservice/all-requests/leave')}}> Leave Requests</div>
                <div className='button-5 font-semibold text-sm my-1' onClick={()=>{navigate('/selfservice/all-requests/vehicle')}}> Vehicle Requests</div>
                <div className='button-5 font-semibold text-sm my-1' onClick={()=>{navigate('/selfservice/all-requests/assets')}}> Assets Requests</div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/selfservice/all-requests/learnings')}}> Learnings </div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/selfservice/all-requests/tickets')}}> View Tickets</div>
             </div>
             <h6 className='font-bold ml-2 my-2 flex'>  All Requests <AiFillCaretRight className='mx-2' />  </h6>
                        <table className="table-auto border-collapse  w-100 text-center rounded-lg border border-gray-400">
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
                                        Request Type
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Approved Status
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Comments
                                    </th>
                                    {/* <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Actions
                                    </th> */}
                                </tr>
                            </thead>
                            {isloading ? <tbody><tr> <CircularProgress /> </tr> </tbody> : 
                          
                            <tbody className="bg-white ">
                                {reqData.map((ele, i)=>{
                                    return(
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
                                            <div className="text-sm text-gray-500">    {ele.projectName}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                          Leave
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                        {ele.approvedStatus ? "Approved" : "Pending"}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                        <div className='button-sm-1'onClick={()=>handleView(ele.reason, ele.fullname, ele.empID)}>View </div>
                                        </td>
                                        {/* <td className="text-sm px-6 py-4">
                                        ₹500020.00
                                        </td> */}
                        
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

export default ManageReq
