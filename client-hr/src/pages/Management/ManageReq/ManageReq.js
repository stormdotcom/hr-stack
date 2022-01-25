import React, {useEffect} from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import { useNavigate} from 'react-router-dom'
import {AiFillCaretRight} from "react-icons/ai"
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {getLeaveRequest, getLearningRequest, getSkillsRequest} from "../../../api/api"
import {  fetchRequest, fetchLearning, fetchSkills } from '../../../redux/requests/requestSlice'
import Swal from "sweetalert2"
import "./styles.css"
function ManageReq() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    useEffect(() =>     {
        getLearningRequest().then(res=> dispatch(fetchLearning(res.data)))
        .catch(err=> console.log(err.message))
        getLeaveRequest().then(res=> dispatch(fetchRequest(res.data)))
        .catch(err=> console.log(err.message))
        getSkillsRequest().then(res=> dispatch(fetchSkills(res.data)))
        .catch(err=> console.log(err.message))

    }, [navigate])
    const {reqData, learnings, skills} = useSelector(state=> state.requests)
    let isloading=false
    if(!reqData.length && !learnings.length && !skills) isloading=true
    const handleView1 = (data, name, id, type)=>{
        Swal.fire({
            title: '<strong>'+  type +'</strong>',
            html:
            ' <b>'+ name+ '</b> | ' +
            ' <b>'+ id + '\n </b>' +
            '</br>',
            imageUrl: data,
            imageHeight: 300,
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
    <li> <Link to="/management">Management </Link></li>
    <li><span className="text-gray-500 mx-2">/</span></li>
    <li className="text-gray-500">Manage Requests</li>
  </ol>
</nav>
        <div className="container my-5 tableView py-4 overflow-x-auto">
            <div className='button-groups'> 
            <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/management/all-requests')}} style={{backgroundColor:"#3283bd"}}> All Requests</div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/management/all-requests/leave')}}> Leave Requests</div>
                <div className='button-5 font-semibold text-sm my-1' onClick={()=>{navigate('/management/all-requests/vehicle')}}> Vehicle Requests</div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/management/all-requests/learnings')}}> Learnings </div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/management/all-requests/skills')}}> Skills Updation </div>
             </div>
             <h6 className='font-bold ml-2 my-2 flex'>  All Requests <AiFillCaretRight className='mx-2' />  </h6>
             { isloading  ? <div className='flex justify-center align-center'> <p>No data</p> </div> :
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
                                        Comments / Attachments
                                    </th>
                                </tr>
                            </thead>
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
                                        <div className='button-sm-1'onClick={()=>handleView(ele.reason, ele.fullname, ele.empID, "Leave Request")}>View </div>
                                        </td>
                                    </tr>
                                    );
                                })}
                             {learnings.map((ele, i)=>{
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
                                            <div className="text-sm text-gray-500">    {ele.project}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                          Learnings and Development
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                        {ele.resolved ? "Resolved" : "Pending"}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                        <div className='button-sm-1'onClick={()=>handleView(ele.comments, ele.fullname, ele.empID, "Tech Issue")}>View </div>
                                        </td>
                                    </tr>
                                    );
                                })}
                                {skills.map((ele, i)=>{
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
                                            <div className="text-sm text-gray-500">    {ele.project}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                          Skill Updation Request
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                        {ele.approved ? "Approved" : "Approval Pending"}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                        <div className='button-sm-1'onClick={()=>handleView1(ele.selectedFile, ele.fullname, ele.empID, "Skill Updation")}>View </div>
                                        </td>
                                    </tr>
                                    );
                                })}
                        
                            </tbody>
                        </table>}
                    </div>
        </div>
        <NavBar />
        </>
    )
}

export default ManageReq
