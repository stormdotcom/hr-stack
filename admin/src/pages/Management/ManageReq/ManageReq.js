import React from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import { useNavigate} from 'react-router-dom'
import {AiFillCaretRight} from "react-icons/ai"
import { Link } from 'react-router-dom'
import "./styles.css"
function ManageReq() {
    const navigate = useNavigate()
    return (
        <>
        <div className='viewPay'>
        <nav class="rounded-md w-full">
  <ol class="list-reset flex">
    <li> <Link to="/selfservice">Self Service </Link></li>
    <li><span class="text-gray-500 mx-2">/</span></li>
    <li class="text-gray-500">Manage Requests</li>
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
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white ">
                                <tr className="whitespace-nowrap">
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                    ₹ 45000.00
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                        ₹1020.00
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500">    ₹2020.00</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                    %10
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                    ₹500020.00
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                    <div className='button-sm-1'>View</div>
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                    ₹500020.00
                                    </td>
                    
                                </tr>
                        
    
                        
                            </tbody>
                        </table>
                    </div>
        </div>
        <NavBar />
        </>
    )
}

export default ManageReq
