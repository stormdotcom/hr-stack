import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import {RiComputerFill} from "react-icons/ri"
import {IoIosPeople} from "react-icons/io"
import {MdPendingActions, MdImportantDevices, MdMoreTime} from "react-icons/md"
import { FcHighPriority } from "react-icons/fc"

import "./styles.css"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { CircularProgress, Alert } from '@mui/material'

function HomeHR() {
  const dispatch = useDispatch()
    const navigate= useNavigate()
    const {stats, isloading, error} = useSelector(state => state.admin)

  console.log(stats)
    return (
        <div>
            <div className='separation'>
            {error && <div className='flex justify-center'> <Alert severity='warning'> {error}</Alert> </div>}
              {isloading? <CircularProgress/> : 
                <div className='cardTopAdmin'> 
               
                <div className='flex justify-center cardItem'>
                   <div className="homeTopIcon"> 
                 <MdPendingActions className="text-fourth text-4xl" />
               </div>
            <div className='text-left'>
            <h5 className=' pl-1 font-semibold'> {stats?.pendingTickets}</h5>
              <h6 className='pl-1 text-secondary'> Tickets Pending </h6>
            </div>
          </div>
          <div className='flex justify-center cardItem'>
                   <div className="homeTopIcon"> 
                 <FcHighPriority className="text-fourth text-4xl" />
               </div>
            <div className='text-left'>
            <h5 className=' pl-1 font-semibold'> {stats?.highPriorityTickets}</h5>
              <h6 className='pl-1 text-secondary'> High Priority Tickets  </h6>
            </div>
          </div>
          <div className='flex justify-center cardItem'>
            <div className="homeTopIcon">            
            <MdMoreTime className="text-fourth text-4xl" />
            </div>
            <div className='text-left'>
            <h5 className=' pl-1 font-semibold'>{stats?.onDelayTickets}</h5>
              <h6 className='pl-1 text-secondary'> Ticket On Progress</h6>
            </div>
          </div>
          <div className='flex justify-center cardItem'>
            <div className="homeTopIcon">            
            <RiComputerFill className="text-fourth text-4xl" />
            </div>
            <div className='text-left'>
            <h5 className=' pl-1 font-semibold'>{stats?.totalAssets}</h5>
              <h6 className='pl-1 text-secondary'>Total Assets</h6>
            </div>
          </div>


          <div className='flex justify-center cardItem'>
            <div className="homeTopIcon">            
            <MdImportantDevices className="text-fourth text-4xl" />
            </div>
            <div className='text-left'>
            <h5 className=' pl-1 font-semibold'>{stats?.availbleAssets}</h5>
              <h6 className='pl-1 text-secondary'>Available Assets</h6>
            </div>
          </div>
          <div className='flex justify-center cardItem'>
            <div className="homeTopIcon">            
            <IoIosPeople className="text-fourth text-4xl" />
            </div>
            <div className='text-left'>
            <h5 className=' pl-1 font-semibold'>{stats?.employeeCount}</h5>
              <h6 className='pl-1 text-secondary'>Total Employees</h6>
            </div>
          </div>

                </div>
                }

                <div className='mainChart mt-3'>
                </div>
                <div className='flex justify-around align-center mt-1 mb-5'> 
                <div className="hrCards"onClick={()=>{navigate("/add-assets")}} >  Add Assets</div>
                    <div className="hrCards"> Add Designation</div>
                    <div className="hrCards"> Update Employee Details</div>
                </div>
            </div>
            
            <NavBar />
        </div>
    )
}

export default HomeHR
