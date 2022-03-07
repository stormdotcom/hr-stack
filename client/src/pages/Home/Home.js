import React, {useEffect, useState}  from 'react'
import Navbar from "../../components/NavBar/NavBar";
import { useNavigate } from 'react-router-dom';
import "./styles.css"
import {MdBusinessCenter} from "react-icons/md"
import {VscProject} from "react-icons/vsc"
import {FaRegCalendarTimes} from 'react-icons/fa'
import {AiFillStar} from "react-icons/ai"
import { useSelector, } from "react-redux"
import {  CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import{getEvents, getAnnouncements, getPerformer} from "../../api/employee"

function Home() {
  const {data, isloading,} = useSelector(state => state.employee)
  const [event, setEvent] = useState({})
  const [announcements, setAnnouncements] = useState({})
  const [performer, setPerformer] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    getEvents().then(res => {
      setEvent(res.data)
    }).catch(err=> console.log("Events " + err.message))
    getAnnouncements().then(res => {
      setAnnouncements(res.data)
    }).catch(err=> console.log("Events " + err.message))
    getPerformer().then(res => {
      setPerformer(res.data)
    }).catch(err=> console.log("Events " + err.message))
  }, [navigate])


    return (
      <>
      <div className="home">
        {isloading && !data ? <div className='flex justify-center align-center'> <CircularProgress color="info" style={{padding: "50px"}} /></div> : <>
          <div className="cardTop">
          <div className='flex justify-center cardItem'>
            <div className="homeTopIcon"> 
            <MdBusinessCenter className="text-fourth md:text-4xl " />
            </div>
            <div className='text-left'>
            <h5 className=' pl-1 font-semibold'> {data?.projectAllocated?.Project}</h5>
              <h6 className='pl-1 text-secondary'>Current Project</h6>
            </div>
            
          </div>
          <div className='flex justify-center cardItem'>
            <div className="homeTopIcon"> 
            <VscProject className="text-fourth  md:text-4xl" />
            </div>
            <div className='text-left'>
            <h5 className=' pl-1 font-semibold'>{data?.projectAllocated?.Status ? 1: 0 }</h5>
              <h6 className='pl-1 text-secondary'>Allocated Project</h6>
            </div>
            
          </div>

      <div className='flex justify-center cardItem'>
            <div className="homeTopIcon"> 
            <FaRegCalendarTimes className="text-fourth  md:text-4xl" />
            </div>
            <div className='text-left'>
            <h5 className=' pl-1 font-semibold'>0</h5>
              <h6 className='pl-1 text-secondary'>Timesheet Pending</h6>
            </div>
            
          </div>
          </div>
        {performer &&     <div className="cardStarEmployees">

<h5 className='mt-2 mx-auto font-bold sm:text-sm text-center'> Performer of Month</h5>

 <div className='p-1 flex stars5'> <AiFillStar className="text-gold" /> <AiFillStar className="text-gold" />  <AiFillStar className="text-gold" />  <AiFillStar  className="text-gold"/>  <AiFillStar  className="text-gold"/> </div>

  

<div className='flex justify-around my-2 mx-auto starCard'>
  {performer.map((ele, i)=>{
    return (
      <div key={i} className='p-1 mx-4'>
        <div className='flex justify-center items-center'> 
        <Avatar  sx={{ width: 56, height: 56 }} alt={ele.fullanme} src={ele?.selectedFile} /> </div>
      <div className='text-center mt-2 mb-3'>
        <h6 className='font-semibold'>
          {ele.fullname}
        </h6>
        <p className='text-sm'> {ele.Designation.name}</p>
        <small className='text-sm'> {ele.projectAllocated.name} </small>
      </div>
    </div>

    )
  })}

    
</div>

</div>}


          <div className='homeCompanyEvents'>
            {event && 
                        <div className='homeEvent'>
                        <h6 className='mt-4 text text-center font-bold '>Events </h6>
                        <img height="150px" style={{width: "100%"}} alt="eventsWallpaper" src={event?.selectedFile}/>
                        <div className='lg:px-5 md:px-2 px-3 py-2'>
                          <h6 className='font-semibold my-2'>{event?.title} </h6>
                          <p className='text-sm'> {event?.description}</p>
                        </div>
                    </div>
            }

            {announcements && <div className='homeEvent'>
            <h6 className='mt-4 text text-center font-bold '>Announcements </h6>
                <img height="150px" style={{width: "100%"}} src={announcements?.selectedFile}  alt="announcementsWallpaper"/>
                <div className='lg:px-5 md:px-2  px-3 py-2'>
                  <h6 className='font-semibold my-2'>{announcements?.title} </h6>
                  <p className='text-sm'> {announcements?.description}</p>
                </div>

          </div>}
        


          </div>
          </>}
        
      </div>
      <Navbar />
      </>
        
    )
}

export default Home






