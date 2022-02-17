import React from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import { useNavigate} from 'react-router-dom'
import {AiFillCaretRight} from "react-icons/ai"
import { Link } from 'react-router-dom'
import {useSelector} from "react-redux"
import Swal from "sweetalert2"
import moment from "moment"
import "./styles.css"
function VehicleReq() {
    const navigate = useNavigate()
    const {  cab } = useSelector((state) => state.request);
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
    return (
        <>
        <div className='viewPay'>
            <div className='navigateSelfService'> 
            <nav className="rounded-md w-full ">
                    <ol className="list-reset flex">
                        <li> <Link to="/selfservice">Self Service </Link></li>
                        <li><span className="text-gray-500 mx-2">/</span></li>
                        <li className="text-gray-500">Manage Requests</li>
                    </ol>
                    </nav>
                 </div>

        <div className="container my-5 tableView py-4 overflow-x-auto">
            <div className='button-groups'> 
            <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/selfservice/all-requests')}} > All Requests</div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/selfservice/all-requests/leave')}}> Leave Requests</div>
                <div className='button-5 font-semibold text-sm my-1' style={{backgroundColor:"#3283bd"}} onClick={()=>{navigate('/selfservice/all-requests/vehicle')}}> Vehicle Requests</div>
                <div className='button-5 font-semibold text-sm my-1' onClick={()=>{navigate('/selfservice/all-requests/assets')}}> Assets Requests</div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/selfservice/all-requests/learnings')}}> Learnings </div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/selfservice/all-requests/tickets')}}> View Tickets</div>
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
