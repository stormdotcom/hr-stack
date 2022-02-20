import React, {useState, useEffect} from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import { useNavigate} from 'react-router-dom'
import {AiFillCaretRight} from "react-icons/ai"
import { Link } from 'react-router-dom'
import "./styles.css"
import {MdEmail} from "react-icons/md"
import { getSperationRequest, approveSeperation, declineSeperation} from "../../../api/api"
import moment from "moment"
import Swal from "sweetalert2"

// Dialog API
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
function Seperation() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});
    const [allRequest, setAllRequest] = useState(null);

    const handleClickOpen = (data) => {
        setData(data)

      setOpen(true);
    };
    const handleClose = (e) => {
      setOpen(false);
    };
    const handleApprove =  (reqID)=>{
        setOpen(false);
        Swal.fire({
            title: 'Approve Leaving?',
            showCancelButton: true,
            confirmButtonText: 'Approve',
            denyButtonText: `Back`,
          }).then(async(result) => {
            if (result.isConfirmed) {
                let date = new Date((new Date()).getTime() + (30 * 86400000))
                  let data = {leavingDate:date, reqID: reqID}
                  approveSeperation(data).then((res)=> {
                    getSperationRequest().then(res=> setAllRequest(res.data))
                    .catch(err => console.log(err.message))
                    Swal.fire( 'Success!',   'Approved!',   'success' )})
                                         .catch((err)=> Swal.fire( 'Failed!',   'Failed Approval!',   'info' ))  

            } 
          })

          
    }
    const handleDecline =  (reqID)=>{
        setOpen(false);
        Swal.fire({
            title: 'Reject Request?',
            showCancelButton: true,
            confirmButtonText: 'Reject',
            denyButtonText: `Back`,
          }).then(async(result) => {
            if (result.isConfirmed) {
                const { value: text } = await Swal.fire({
                    input: 'textarea',
                    inputLabel: 'Reason for rejecting Separation Request',
                    inputPlaceholder: 'Enter the Reason',
                    inputValidator: (value) => {
                        if (!value) {
                          return 'You need to Enter Reason!'
                        }
                    }   
                  }) 
                  let data = {comments:text, reqID: reqID}
                  declineSeperation(data).then((res)=> {
                    getSperationRequest().then(res=> setAllRequest(res.data))
                    .catch(err => console.log(err.message))
                                      Swal.fire( 'Success!',   'Rejected!',   'success' )})
                                         .catch((err)=> Swal.fire( 'Failed!',   'Failed Approval!',   'info' ))  

            } 
          })

          
    }
    useEffect(()=>{
        getSperationRequest().then(res=> setAllRequest(res.data))
        .catch(err => console.log(err.message))
        return (()=>{
            setAllRequest(null)
            setData(null)
        })
    }, [navigate])
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
                <div className='button-5 font-semibold text-sm my-1'style={{backgroundColor:"#3283bd"}}  onClick={()=>{navigate('/management/all-requests/seperation')}}> Separation  Requests </div>
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/management/all-requests/transfer')}}> Transfer Requests </div>
             </div>
             <h6 className='font-bold ml-2 my-2 flex'>  All Requests <AiFillCaretRight className='mx-2' /> Separation  Requests </h6>
            {allRequest && 
            <div>
            <div className=' flex-col px-10'> 
            {allRequest.map((ele, i)=>{
                return (
                    <div key={i} className='flex border  mailBar py-2 px-6 my-2 '  onClick={()=>handleClickOpen(ele)}>
                    <div className='flex justify-center items-center ml-4'> <MdEmail className='mx-auto text-xl text-fourth ' /> </div> 
                    <div className='flex justify-center items-center mx-4 ' > 
                    <p className='font-semibold my-auto'> {moment(ele?.requestedDate).fromNow() }   </p>
                    </div>
                    <div className='flex-col justify-cneter  mx-4'>
                        <div className='flex-col space-y-1 items-center mx-10'>
                            <p className='font-bold mb-0'>{ele.fullname+ " | " + ele.empID}</p>
                            <small className='text-ellipsis'>{ele?.text}</small>
                        </div>
                        <div>
                           
                        </div>
                    </div>
                
  
                    </div>   
                )
            })}
 
                     
             </div>

            </div> }

                {data &&     <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {data?.fullname +  " Transfer Request"}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                           {data?.text}
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button variant="outlined" color="secondary" onClick={handleClose}>X Close</Button>
                        <Button variant="contained" color="success" onClick={()=>handleApprove(data._id)}>Approve</Button>
                        <Button variant="contained" color="error" onClick={()=>handleDecline(data._id)} autoFocus>  Reject </Button>
                        </DialogActions>
                    </Dialog> }
                    </div>

           
        </div>
        <NavBar />
        </>
    )
}

export default Seperation
