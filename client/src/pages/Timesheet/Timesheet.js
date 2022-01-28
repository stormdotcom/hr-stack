import React, {useEffect, useState} from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Calendar, dateFnsLocalizer   } from 'react-big-calendar'
import Swal from 'sweetalert2'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enIN from 'date-fns/locale/en-IN'
import { useNavigate } from 'react-router-dom'
import { getTimeSheet, timeIn, timeOut, timeInStats, timeOutStats } from '../../api/employee'
import { errorfetching, fetchTimeSheet } from '../../redux/timesheet/timeSheetSlice'
import { useDispatch } from 'react-redux'
import { Alert } from '@mui/material'
import "./styles.css"
import "./react-big-calendar.css"

const allView = ["month", "work_week"]
const locales = {
    'en-IN': enIN,
  }
 const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })


function Timesheet() {
  const user = JSON.parse(localStorage.getItem("employee"))
  const [error, setError] = useState(null)
  const [events, setEvents] = useState([])
  const [timeInBtn, setTimeInBtn] = useState(false)
  const [timeOutBtn, setTimeOutBtn] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const  {data, error} = useSelector(state=> state.timeheet)
  const handleTimeIn = (e)=>{
    e.preventDefault()
    timeIn({id:user.result._id}).then(()=> {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Time sheet updated!',
        confirmButtonText: 'ok'
      })
      setTimeInBtn(true)})
      .catch(err=> {
      setError(err.message)
      dispatch(errorfetching(err.message))
    })
  }
  const handleTimeOut = (e)=>{
    e.preventDefault()

    timeOut({id:user.result._id}).then(()=> {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Time sheet Submitted!',
      })
      setTimeOutBtn(true)})
      .catch(err=> {
      setError(err.message)
      dispatch(errorfetching(err.message)) 
    })
  }
    

  useEffect(() => {
      getTimeSheet(user?.result._id).then(res=> {
        setEvents(res.data)
        dispatch(fetchTimeSheet(res.data))
      }).catch(err => dispatch(errorfetching(err.message)))

      timeInStats(user?.result._id).then(res=> setTimeInBtn(res.data.status))
      .catch(err=> dispatch(errorfetching(err.message)))

      timeOutStats(user?.result._id).then(res=> setTimeOutBtn(res.data.status))
      .catch(err=> dispatch(errorfetching(err.message)))

  }, [navigate,timeOutBtn, timeInBtn])
    return (
        <div>
            <div className='timeSheet'>
              <div className='px-4'>
              {error && <div className='flex justify-center align-center'> <Alert severity="error">{error}!</Alert> </div>}
                <div className='flex justify-around my-4'> 
              {timeInBtn ? 
              <button className='disbaled-button-01 grid justify-items-start' disabled>Time In </button>: 
              <button className='button-1 grid justify-items-start' onClick={handleTimeIn} >Time In  </button>}  
              
              {timeOutBtn ? 
              <button className='button-1 grid justify-items-end' onClick={handleTimeOut} >Time Out </button> 
            : <button className='disbaled-button-01 grid justify-items-end'  disabled>Time Out </button>  }
          </div>

              <Calendar
       localizer={localizer}
       views={allView}
        step={60}
       startAccessor="start"
       defaultView="month"
       events={events}
       defaultDate={new Date()}
       endAccessor="end"
      style={{ height: 500 }}
    />
              </div>
                </div>
           
            <NavBar />
        </div>
    )
}

export default Timesheet
