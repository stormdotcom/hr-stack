import React from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import { useNavigate} from 'react-router-dom'
import {AiFillCaretRight} from "react-icons/ai"
import { Link } from 'react-router-dom'
import Swal from "sweetalert2"
import "./styles.css"
import moment from "moment"
import { useSelector } from 'react-redux'
function LearningsReq() {
    const navigate = useNavigate()
    const {learnings} = useSelector(state=> state.request)
    let isloading = false
    if(learnings.length) isloading=true
    const handleView = (data, name, id, type)=>{
        Swal.fire({
            title: '<strong>'+  type +'</strong>',
            html:
            ' <b>'+ name+ '</b> | ' +
            ' <b>'+ id + '\n </b>' +
            '</br>'
            +"\n"+ data+  "\n",
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
        })
    }
    const viewURL = (url)=>{
        Swal.fire({
            icon: 'info',
            text: 'Something went wrong!',
            html:'<a href='+url+' target="_blank" >Click here</a>',
          })
    }
    return (
        <>
        <div className='viewPay'>


        <div className="container my-5 tableView py-4 overflow-x-auto">
        <nav className="rounded-md w-full">
            <ol className="list-reset flex">
                <li> <Link to="/selfservice">Self Services </Link></li>
                <li><span className="text-gray-500 mx-2">/</span></li>
                <li className="text-gray-500">Manage Requests</li>
            </ol>
            </nav>
            <div className='button-groups'> 
            <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/selfservice/all-requests')}} > All Requests</div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/selfservice/all-requests/leave')}}> Leave Requests</div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/selfservice/all-requests/vehicle')}}> Vehicle Requests</div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/selfservice/all-requests/assets')}}> Assets Requests</div>
                <div className='button-5 font-semibold text-sm my-1' style={{backgroundColor:"#3283bd"}} onClick={()=>{navigate('/selfservice/all-requests/learnings')}}> Learnings </div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/selfservice/all-requests/tickets')}}> View Tickets</div>
             </div>
             <h6 className='font-bold ml-2 my-2 flex'>  All Requests <AiFillCaretRight className='mx-2' /> Learnings Requests </h6>
                        {isloading ? 
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
                                        Technology
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Platform
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Course Type
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Resource URL
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
                            {learnings.map((ele, i)=>{
                                return (
                                    <tr key={i} className="whitespace-nowrap">
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                    {ele.fullname}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                        {ele.empID}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500"> {ele.technology} </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                    {ele.platform}
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                    {ele.courseType}
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                   <div className='button-sm-1 text-sm my-1' onClick={()=> viewURL(ele.resourceURL)}>View URL</div>
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                    {moment(ele.requestedDate).utc().format('DD-MM-YYYY')}   
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                    {ele.approvedStatus ? "Approved" : "Not Approved"}
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                        <div className='button-sm-1 text-sm my-1' onClick={()=>handleView(ele.comments, ele.fullname, ele.empID, "Learnings Request")}> View </div>
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                    <div className='button-sm-1 text-sm my-1'>Approve</div>
                                    <div className='button-sm-2 text-sm my-1'  >Deline</div>
                                    </td>
                                </tr> 
                                )
                            })}
                       
    
                        
                            </tbody>
                        </table>
                        : <div className='flex justify-center'> <p> No data </p></div> }
                    </div>
        </div>
        <NavBar />
        </>
    )
}

export default LearningsReq
