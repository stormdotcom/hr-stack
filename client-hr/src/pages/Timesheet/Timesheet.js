import React, {useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
// import { Calendar, dateFnsLocalizer, Views   } from 'react-big-calendar'
import moment from 'moment'
import format from 'date-fns/format'
// import parse from 'date-fns/parse'
// import startOfWeek from 'date-fns/startOfWeek'
// import getDay from 'date-fns/getDay'
// import enIN from 'date-fns/locale/en-IN'
// import Moment from 'react-moment';
import "./styles.css"
import "./react-big-calendar.css"
import { Link, useNavigate } from 'react-router-dom'
import { getPendingTimeSheet, timeSheetApprove } from '../../api/api'
import {useDispatch, useSelector} from "react-redux"
import { errorfetching, fetchData, initial } from '../../redux/pendingTimeSheet/pendingTimeSheetSlice'
import { CircularProgress,Alert} from '@mui/material';
// const allViews = Object.keys(Views).map(k => Views[k])
// const locales = {
//     'en-IN': enIN,
//   }


//  const localizer = dateFnsLocalizer({
//     format,
//     parse,
//     startOfWeek,
//     getDay,
//     locales,
//   })

function Timesheet() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {data, isloading, error,} =  useSelector(state=> state.pending)
  const [k, setK]= useState(0)
  useEffect(() => {
    dispatch(initial())
    getPendingTimeSheet()
    .then(res=> dispatch(fetchData(res.data)))
    .catch(err=> dispatch(errorfetching(err.messsage)))
    }
  , [navigate, k])
  const handleApprove = (empID, day)=>{
    let ids = {empID, day,}
    timeSheetApprove(ids)
    .then(()=>{
      getPendingTimeSheet()
      .then(res=> dispatch(fetchData(res.data)))
      .catch(err=> dispatch(errorfetching(err.messsage)))
    })
    .catch(err=> dispatch(errorfetching(err.messsage)))
  }
  const handleNotify = (empID, day)=>{
    console.log(empID, day)
  }

    return (
        <div>
            <div className='timeSheet'>
              {/* <div className='px-4'>
                <div className='flex justify-around my-4'> <button className='button-1 grid justify-items-start'>Time In </button>
                <button className='button-1 grid justify-items-end'>Time Out </button> </div>
                

              <Calendar
       localizer={localizer}
       views={allViews}
        step={60}
       startAccessor="start"
       defaultView="month"
       events={events}
       defaultDate={new Date()}
       endAccessor="end"
      style={{ height: 500 }}
    />
              </div> */}

            <nav className="rounded-md w-full">
                  <ol className="list-reset flex">
                  <li> <Link to="/timesheet">TimeSheet </Link></li>
                    <li><span className="text-gray-500 mx-2">/</span></li>
                    <li className="text-gray-500">Time Sheet Management</li>
              </ol>
            </nav>
            {error && <div className='flex justify-center mt-2 align-center'> <Alert severity="error">{error}!</Alert> </div>}
            <div className='separationStatus'>
            {isloading  ? <div className='flex justify-center '><CircularProgress size={50}/></div> :
            <>
            <h5 className='mt-4 mb-2 text-center pt-3 font-semibold'>Time Sheet Status</h5>

            <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
           <div className="overflow-hidden">
           <select name="cars" id="cars" className='flex flex-start ml-4'>
      <option >Select Employee:</option>
                 {data.map((ele,i) => <option key={i} onClick={()=>setK(i)} defaultValue={ele.fullname} value="saab">{ele.fullname}</option>)}
                  
                </select>
             <table className="min-w-full">
               <thead className="border-b"> 
                 <tr>
              <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                Date 
              </th>
              <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                Employee Name 
              </th>
              <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                Project
              </th>
              <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                Status
              </th>
              <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                Activity  <small>(in hours)</small> 
              </th>
              <th scope="col" className="text-sm text-center font-semibold text-gray-900 px-6 py-4 text-left">
                Actions
              </th>
              <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                
              </th>
            </tr>
          </thead>
          <tbody>

           {data[k].timeSheet.map((element, i)=> (<tr key={i} className="bg-white border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> 
              {moment(element.start).utc().format('DD-MM-YYYY')}          
               </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {data[k].fullname}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {data[k].projectAllocated.Project}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {element.title}
              </td>
              <td className="text-sm text-gray-900 text-center font-light px-6 py-4 whitespace-nowrap">
              {element.hours
              }
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap ">
              {element.title==="Submitted" && <div className='button-sm-1 mx-auto' onClick={()=>{handleApprove(data[k]._id, element.day)}}> Approve</div>}
              {element.title==="Pending" && <p>Submission Pending</p>}
                
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap ">  
              {element.title ==="Pending" && <div className='button-sm-2  mx-auto'onClick={()=>{handleNotify(data[k]._id, element.day)}}> Notify</div> }
              </td>
            </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</>}
            </div>
                </div>
           
            <NavBar />
        </div>
    )
}

export default Timesheet
