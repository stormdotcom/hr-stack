import React from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import { useNavigate} from 'react-router-dom'
import {AiFillCaretRight} from "react-icons/ai"
import { Link } from 'react-router-dom'
import {useSelector} from "react-redux"
import moment from 'moment'
import Swal from "sweetalert2"
import {setPriority} from "../../../api/employee"
import "./styles.css"
function RaisedIssue() {
    const {tickets} = useSelector(state => state.request)
   const navigate = useNavigate()
   let isLoading = false
   if(tickets.length) isLoading=true
   const handlePriority =async (id)=>{
    const { value: Priority } = await Swal.fire({
        title: 'Set Ticket Priority',
        input: 'select',
        inputOptions: {
          'Priority List': {
            Low: 'Low',
            Medium: 'Medium',
            High: 'High',
            Critical: 'Critical'
          },
        },
        inputPlaceholder: 'Select a Priority  Level',
        showCancelButton: true,
        inputValidator: (value) => {
            if(!value) return "Select a Priority Level"
        }
      })
      let form = {id:id, Priority:Priority}
      setPriority(form).then(()=> Swal.fire('Priority Updated','success'))
      .catch((err)=> Swal.fire('Failed Updation','info'))
   }
   const handleView = (data, name, id, type)=>{
    Swal.fire({
        title: '<strong>'+ type +'</strong>',
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
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/selfservice/all-requests/learnings')}}> Learnings </div>
                <div className='button-5 font-semibold text-sm my-1' style={{backgroundColor:"#3283bd"}} onClick={()=>{navigate('/selfservice/all-requests/tickets')}}> View Tickets</div>
             </div>
             <h6 className='font-bold ml-2 my-2 flex'>  All Requests <AiFillCaretRight className='mx-2' /> Raised Issues </h6>
             {isLoading ? 
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
                                        Priority
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                       Created Date
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                         Status
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Issue Title
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white ">
                                {tickets.map((ele, i)=>{
                                    return (
                                        <tr key={i} className="whitespace-nowrap">
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                        {ele.employeeName}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                        {ele.employeeID}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                        {ele.priority}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                        {moment(ele.date).utc().format('DD-MM-YYYY')} 
                                        
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                        {ele.resolve ? "Resolved" : "Pending"}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                        {ele.subject}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                        <div className='button-sm-1 text-sm my-1'
                                        onClick={()=>handlePriority(ele._id)}>Set Priority</div>
                                        <div className='button-sm-2 text-sm my-1' 
                                        onClick={()=>handleView(ele.issue, ele.employeeName, ele.employeeID, "Tech Issue")}>View </div>
                                        </td>
                        
                                    </tr>
                                    )
                                })}

    
                        
                            </tbody>
                        </table>
                        : <div className='flex justify-center'> <p> No data </p> </div> }
                    </div>
        </div>
        <NavBar />
        </>
    )
}

export default RaisedIssue
