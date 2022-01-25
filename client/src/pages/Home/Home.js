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
import{getEvents, getAnnouncements} from "../../api/employee"

function Home() {
  const {data, isloading,} = useSelector(state => state.employee)
  const [event, setEvent] = useState({})
  const [announcements, setAnnouncements] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    getEvents().then(res => {
      setEvent(res.data)
    })
    getAnnouncements().then(res => {
      setAnnouncements(res.data)
    })
  }, [navigate])


    return (
      <>
      <div className="home">
        {isloading && !data ? <div className='flex justify-center align-center'> <CircularProgress color="info" style={{padding: "50px"}} /></div> : <>
          <div className="cardTop">
          <div className='flex justify-center cardItem'>
            <div className="homeTopIcon"> 
            <MdBusinessCenter className="text-fourth text-4xl" />
            </div>
            <div className='text-left'>
            <h5 className=' pl-1 font-semibold'> {data?.projectAllocated?.Project}</h5>
              <h6 className='pl-1 text-secondary'>Current Project</h6>
            </div>
            
          </div>
          <div className='flex justify-center cardItem'>
            <div className="homeTopIcon"> 
            <VscProject className="text-fourth text-4xl" />
            </div>
            <div className='text-left'>
            <h5 className=' pl-1 font-semibold'>{data?.projectAllocated?.Status ? 1: 0 }</h5>
              <h6 className='pl-1 text-secondary'>Allocated Project</h6>
            </div>
            
          </div>

      <div className='flex justify-center cardItem'>
            <div className="homeTopIcon"> 
            <FaRegCalendarTimes className="text-fourth text-4xl" />
            </div>
            <div className='text-left'>
            <h5 className=' pl-1 font-semibold'>1</h5>
              <h6 className='pl-1 text-secondary'>Timesheet Pending</h6>
            </div>
            
          </div>
          </div>

          <div className="cardStarEmployees">

            <h5 className='mt-2 mx-auto font-bold text-center'>Stars of this Quater</h5>
              <div className='p-1  flex sm:mx-auto md:mx-auto'> <AiFillStar className="text-gold" /> <AiFillStar className="text-gold" />  <AiFillStar className="text-gold" />  <AiFillStar  className="text-gold"/>  <AiFillStar  className="text-gold"/> </div>
           
            <div className='flex justify-around my-2 mx-auto starCard'>
                <div className='p-1 mx-4'>
                  <img alt="employee" height="100px" width="150px" src="https://fj-employer-blog.s3.amazonaws.com/employer-blog/wp-content/uploads/2015/11/5-Ways-to-Analyze-Employee-Performance-1024x508.jpg" />
                  <div className='text-center mt-2 mb-3'>
                    <h6 className='font-semibold'>
                      Employee 1
                    </h6>
                    <p className='text-sm'> Team | Project</p>
                  </div>
                </div>
                
                <div className='p-1 mx-4'>
                  <img alt="employee" height="100px" width="150px" src="https://fj-employer-blog.s3.amazonaws.com/employer-blog/wp-content/uploads/2015/11/5-Ways-to-Analyze-Employee-Performance-1024x508.jpg" />
                  <div className='text-center mt-2 mb-3'>
                    <h6 className='font-semibold'>
                      Employee 2
                    </h6>
                    <p className='text-sm'> Team | Project</p>
                  </div>
                </div>

                <div className='p-1 mx-4'>
                  <img alt="employee" height="100px" width="150px" src="https://fj-employer-blog.s3.amazonaws.com/employer-blog/wp-content/uploads/2015/11/5-Ways-to-Analyze-Employee-Performance-1024x508.jpg" />
                  <div className='text-center mt-2 mb-3'>
                    <h6 className='font-semibold'>
                      Employee 3
                    </h6>
                    <p className='text-sm'> Team | Project</p>
                  </div>
                </div>
                
            </div>

          </div>

          <div className='homeCompanyEvents'>
            {event && 
                        <div className='homeEvent'>
                        <h6 className='mt-4 text text-center font-bold '>Events </h6>
                        <img height="150px" style={{width: "100%"}} alt="eventsWallpaper" src={event?.selectedFile}/>
                        <div className='px-5 py-2'>
                          <h6 className='font-semibold my-2'>{event?.title} </h6>
                          <p className='text-sm'> {event?.description}</p>
                        </div>
                    </div>
            }

            {announcements && <div className='homeEvent'>
            <h6 className='mt-4 text text-center font-bold '>Announcements </h6>
                <img height="150px" style={{width: "100%"}} src={announcements?.selectedFile}  alt="announcementsWallpaper"/>
                <div className='px-5 py-2'>
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






