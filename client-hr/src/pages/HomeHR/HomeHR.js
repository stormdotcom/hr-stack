import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import {HiOutlineUserGroup} from "react-icons/hi"
import {FaUsersSlash, FaRegCalendarTimes} from "react-icons/fa"
import {MdPendingActions} from "react-icons/md"
import CanvasJSReact from './canvasjs.react'
import { fetchStats } from '../../redux/hr/hrSlice'
import "./styles.css"
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
function HomeHR() {
    const navigate= useNavigate()
    const { stats} = useSelector(state => state.hr)
    const options = {
        animationEnabled: true,
        theme: "white",
        
 
        axisY: {
        lineColor: "#2072bb",
        gridColor: "#278acb",
        title: "Rating",
            scaleBreaks: {
                autoCalculate: true,
                type: "wavy",
                lineColor: "#2072bb"
            }
        },
        data: [{
            type: "column",
            indexLabel: "{y}",		
            indexLabelFontColor: "#2072bb",
            dataPoints: [
                {"label":"Total Attendance","y":98},
                {"label":"Project Status","y":100},
                {"label":"On Leave","y":100},
                {"label":"Over All Performance","y":90},
                {"label":"Others","y":90},  
            ]
        }]
    }
    return (
        <div>
            <div className='separation'>
                <div className='cardTopHR'> 
                <div className='flex justify-center cardItem'>
            <div className="homeTopIcon"> 
            <FaUsersSlash className="text-fourth text-4xl" />
            </div>
            <div className='text-left'>
            <h5 className=' pl-1 font-semibold'> {stats?.employeesOnLeave}</h5>
              <h6 className='pl-1 text-secondary'>Employees On Leave</h6>
            </div>
            
          </div>
          <div className='flex justify-center cardItem'>
            <div className="homeTopIcon">            
            <HiOutlineUserGroup className="text-fourth text-4xl" />
            </div>
            <div className='text-left'>
            <h5 className=' pl-1 font-semibold'>{stats?.employeeCount}</h5>
              <h6 className='pl-1 text-secondary'>Total Employees</h6>
            </div>
          </div>

          <div className='flex justify-center cardItem'>
            <div className="homeTopIcon">            
            <MdPendingActions className="text-fourth text-4xl" />
            </div>
            <div className='text-left'>
            <h5 className=' pl-1 font-semibold'>{stats?.employeeCount}</h5>
              <h6 className='pl-1 text-secondary'>On Boarding Pending</h6>
            </div>
          </div>

      <div className='flex justify-center cardItem'>
            <div className="homeTopIcon"> 
            <FaRegCalendarTimes className="text-fourth text-4xl" />
            </div>
            <div className='text-left'>
            <h5 className=' pl-1 font-semibold'>{stats?.timeSheetPending}</h5>
              <h6 className='pl-1 text-secondary'>Pending Timesheets</h6>
            </div>
            
          </div>
                </div>
                <div className='mainChart mt-3'>
                <CanvasJSChart options = {options} />
                </div>
                <div className='flex justify-around align-center mt-1 mb-5'> 
                <div className="hrCards"onClick={()=>{navigate("/add-employee")}} >  Add Employee</div>
                    <div className="hrCards"> Add Designation</div>
                    <div className="hrCards"> Update Employee Details</div>
                </div>
            </div>
            
            <NavBar />
        </div>
    )
}

export default HomeHR
