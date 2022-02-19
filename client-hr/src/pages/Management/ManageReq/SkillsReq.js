import React, {useEffect} from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import moment from 'moment'
import {AiFillCaretRight} from "react-icons/ai"
import "./styles.css"
import { Link } from 'react-router-dom';
import {  useSelector } from 'react-redux'
import {skillApprove, skillreject} from "../../../api/api"
import { getSkillsRequest} from "../../../api/api"
import {  fetchSkills } from '../../../redux/requests/requestSlice'
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import Swal from "sweetalert2"
function SkillReq() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { skills} = useSelector(state => state.requests)

    const handleApprove = (id)=>{
        const { value: text } =  Swal.fire({
            title: 'Approve with a Score?',
            input: 'range',
            inputLabel: ' Give a  Score',
            showCancelButton: true,
            inputValidator: async (value) => {
              if (!value) {
                return 'You need to enter score !'
              }
              console.log(text)
              let formData={id:id, data:Number(value)} 
              skillApprove(formData)
              .then(res=> {
                getSkillsRequest().then(res=> dispatch(fetchSkills(res.data)))
                .catch(err=> console.log(err.message))
                  Swal.fire('Approved and Updated', '', 'success')})
              .catch(err=> Swal.fire('Fail Updating!', '', 'info'))
            }
          }) 
    }
    const handleDecline =async (id)=>{
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
              formData={id:id, data:text} 
              skillreject(formData)
              .then(res=> {
                getSkillsRequest().then(res=> dispatch(fetchSkills(res.data)))
                .catch(err=> console.log(err.message))
                  Swal.fire('Skill rejected and updated!', '', 'success')})
              .catch(err=> Swal.fire('Skill rejection Failed!', '', 'info'))
            }
          })     
    }
    const handleView = (data, name, id, type)=>{
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
    useEffect(()=>{
        getSkillsRequest().then(res=> dispatch(fetchSkills(res.data)))
        .catch(err=> console.log(err.message))
    }, [navigate, dispatch])
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
                <div className='button-5 font-semibold text-sm my-1' onClick={()=>{navigate('/management/all-requests/vehicle')}}> Vehicle Requests</div>
                <div className='button-5 font-semibold text-sm my-1' onClick={()=>{navigate('/management/all-requests/learnings')}}> Learnings </div>
                <div className='button-5 font-semibold text-sm my-1' style={{backgroundColor:"#3283bd"}} onClick={()=>{navigate('/management/all-requests/skills')}}> Skills Updation </div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/management/all-requests/seperation')}}> Separation Requests </div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/management/all-requests/transfer')}}> Transfer Requests </div>
             </div>
             <h6 className='font-bold ml-2 my-2 flex'>  All Requests <AiFillCaretRight className='mx-2' /> Skills Updation </h6>
                       
                       {skills.length ? 
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
                                        Skill Rating
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Skill Type
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Requested Date
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Approved Status
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                       Attachments
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                                                        <tbody className="bg-white ">
                                                        {skills.map((ele, i)=>{
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
                                                                    <div className="text-sm text-gray-500">{ele.project}</div>
                                                                </td>
                                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                               {ele.selfRating}
                                                                </td>
                                                                <td className="text-sm px-6 py-4">
                                                                {ele.type} Skill
                                                                </td>
                                                                <td className="text-sm px-6 py-4">
                                                                {moment(ele.date).utc().format('DD-MM-YYYY')}   
                                                            
                                                                </td>
                                                                <td className="text-sm px-6 py-4">
                                                                {ele.approved ? "Approved" : "Approval Pending"}
                                                                </td>
                                                                <td className="text-sm px-6 py-4">
                                                                <div className='button-sm-1 text-sm my-1' 
                                                                onClick={()=>handleView(ele.selectedFile, ele.fullname, ele.empID, "Skill Updation")}>View</div>
                                                                </td>
                                                                <td className="text-sm px-6 py-4 flex-col ">
                                                                <div className='button-sm-1 text-sm my-1'
                                                                onClick={()=>handleApprove(ele._id, ele.userID)}
                                                                >Approve</div>
                                                                <div className='button-sm-2 text-sm my-1'
                                                                onClick={()=>handleDecline(ele._id)}>Deline</div>
                                                                </td>
                                                            </tr>
                                                            );
                                                        })}
                                                    </tbody>
                            
                        </table> : <div className='flex justify-center align-center'> <p>No data</p> </div>} 
                    </div>
        </div>
        <NavBar />
        </>
    )
}

export default SkillReq
