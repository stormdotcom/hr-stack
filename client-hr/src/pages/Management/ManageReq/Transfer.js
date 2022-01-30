import React from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import { useNavigate} from 'react-router-dom'
import {AiFillCaretRight} from "react-icons/ai"
import { Link } from 'react-router-dom'
import "./styles.css"
import {MdEmail} from "react-icons/md"
import {approveLearning, declineLearning} from "../../../api/api"
import moment from "moment"
import Swal from "sweetalert2"
function Transfer() {
    const navigate = useNavigate()
    const learnings= true
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
                  approveLearning(data).then((res)=> Swal.fire( 'Success!',   'Approved!',   'success' ))
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
                declineLearning(data).then((res)=> Swal.fire( 'Success!',   'Declined!',   'success' ))
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
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/management/all-requests/learnings')}}> Learnings </div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/management/all-requests/skills')}}> Skills Updation </div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/management/all-requests/seperation')}}> Separation  Requests </div>
                <div className='button-5 font-semibold text-sm my-1' style={{backgroundColor:"#3283bd"}} onClick={()=>{navigate('/management/all-requests/transfer')}}> Transfer Requests </div>
             </div>
             <h6 className='font-bold ml-2 my-2 flex'>  All Requests <AiFillCaretRight className='mx-2' /> Transfer Requests </h6>
             <div className=' flex-col px-10'> 
             <div className='flex border  mailBar py-2 px-6 my-2 '>
                  <div className='flex justify-center items-center ml-4'> <MdEmail className='mx-auto text-xl text-fourth ' /> </div> 
                  <div className='flex justify-center items-center mx-4 ' > 
                  <p className='font-semibold my-auto'> {moment('Thu Jan 25 2022 17:30:03 GMT+0300').fromNow() }   </p>
                  </div>
                  <div className='flex-col justify-cneter  mx-4'>
                      <div>
                          <p className='font-bold'>title and subject</p>
                      </div>
                      <div>
                          <small>text</small>
                      </div>
                  </div>
                  </div>

        
             </div>
                    </div>
        </div>
        <NavBar />
        </>
    )
}

export default Transfer
