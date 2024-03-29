import React, {useEffect} from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import {AiFillCaretRight} from "react-icons/ai"
import { Link } from 'react-router-dom'
import "./styles.css"
import { useSelector, useDispatch } from 'react-redux'
import {approveLearning, declineLearning} from "../../../api/api"
import moment from "moment"
import Swal from "sweetalert2"
import { useNavigate} from 'react-router-dom'
import {getLearningRequest} from "../../../api/api"
import {  fetchLearning } from '../../../redux/requests/requestSlice'
function LearningsReq() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(()=>{
        getLearningRequest().then(res=> dispatch(fetchLearning(res.data)))
        .catch(err=> console.log(err.message))
    },[navigate, dispatch])
    const {learnings} = useSelector(state => state.requests)
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
    const handleApprove =  (userID)=>{
        Swal.fire({
            title: 'Approve request?',
            showCancelButton: true,
            confirmButtonText: 'Approve',
            denyButtonText: `Back`,
          }).then(async(result) => {
            if (result.isConfirmed) {
                const { value: url } = await Swal.fire({
                    input: 'url',
                    inputLabel: 'Video URL',
                    inputPlaceholder: 'Enter the URL',
                    inputValidator: (value) => {
                        if (!value) {
                          return 'You need to Enter the URL!'
                        }
                    }   
                  }) 
                  let data = {videoURL:url, userID: userID}
                  approveLearning(data).then((res)=> {
                    getLearningRequest().then(res=> dispatch(fetchLearning(res.data)))
                    .catch(err=> console.log(err.message))
                      Swal.fire( 'Success!',   'Approved!',   'success' )})
                                        .catch((err)=> Swal.fire( 'Failed!',   'Failed Approval!',   'info' ))  

            } 
          })

          
    }
    const handleDecline =  (userID)=>{
        Swal.fire({
            title: 'Decline ?',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            denyButtonText: `Back`,
          }).then(async(result) => {
            if (result.isConfirmed) {
                let data = {id: userID}
                declineLearning(data).then((res)=> {
                    getLearningRequest().then(res=> dispatch(fetchLearning(res.data)))
                    .catch(err=> console.log(err.message))
                    Swal.fire( 'Success!',   'Declined!',   'success' )})
                   .catch((err)=> Swal.fire( 'Failed!',   'Failed Updating!',   'info' ))  
            } 
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
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/management/all-requests/vehicle')}}> Vehicle Requests</div>
                <div className='button-5 font-semibold text-sm my-1' style={{backgroundColor:"#3283bd"}} onClick={()=>{navigate('/management/all-requests/learnings')}}> Learnings </div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/management/all-requests/skills')}}> Skills Updation </div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/management/all-requests/seperation')}}> Separation Requests </div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/management/all-requests/transfer')}}> Transfer Requests </div>
             </div>
             <h6 className='font-bold ml-2 my-2 flex'>  All Requests <AiFillCaretRight className='mx-2' /> Learning Requests </h6>
             {learnings.length ?
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
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white ">
                            {learnings.map((ele)=>{
                                return (
                                    <tr className="whitespace-nowrap">
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
                                    <div className='button-sm-1 text-sm my-1' onClick={()=> handleApprove(ele._id)}>Approve</div>
                                    <div className='button-sm-2 text-sm my-1' onClick={()=> handleDecline(ele._id)} >Deline</div>
                                    </td>
                                </tr> 
                                )
                            })}
                       
                            </tbody>
                        </table> : <div className='flex justify-center'> <p>No data</p> </div> }
                    </div>
        </div>
        <NavBar />
        </>
    )
}

export default LearningsReq
