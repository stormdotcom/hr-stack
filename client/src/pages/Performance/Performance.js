import React from 'react'
import "./styles.css"
import NavBar from '../../components/NavBar/NavBar'
import CanvasJSReact from './canvasjs.react'
import {SiStyleshare} from "react-icons/si"
import {BsTrophyFill} from "react-icons/bs"
import {GiStarMedal} from "react-icons/gi"
import {useSelector} from "react-redux"
import {GiMedallist} from "react-icons/gi"
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Performance() {
    const {data} = useSelector(state => state.employee)
    const timeSheet = (data?.timeSheet.length) ? data?.timeSheet : [{title:""}];
    const a = data?.awards?.length>0 ? 1: 0
    const b = data?.accomplishments?.length>0 ? 1: 0
    const c = data?.contributions?.length>0 ? 1: 0
    const overall = (a+b+c) *100/3
    const leaveCount = timeSheet.filter(ele=> ele.title==="On Leave")
    const totalDayWorked = timeSheet.length - leaveCount;
    const attenedance = (totalDayWorked/timeSheet.length ) * 100;
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
                {"label":"Attendance","y":attenedance},
                {"label":"Project Completion","y":25},
                {"label":"Over All Participation","y":Math.floor(overall)},
            ]
        }]
    }
    return (
        <>
      
        <div className='viewPay'>
            <div className='performanceView'>
                <div className='topCards'> 
                <div className='cardPerformance'><SiStyleshare className="text-primary text-4xl" /> <h6 className='font-bold text-lg'> {data?.contributions?.length} </h6><p className='font-medium text-lg'> Contribitions </p> </div>
                <div className='cardPerformance'><BsTrophyFill  className="text-primary text-4xl"/> <h6 className='font-bold text-lg'> {data?.awards?.length} </h6> <p className='font-medium text-lg px-4'> Awards </p></div>
                <div className='cardPerformance'><GiMedallist  className="text-primary text-4xl"/> <h6 className='font-bold text-lg'> {data?.accomplishments?.length} </h6> <p className='font-medium text-lg'> Accomplishments </p></div>
                <div className='cardPerformance'><GiStarMedal  className="text-primary text-4xl"/> <h6 className='font-bold text-lg'> 
                {data?.awards[data?.awards.length -1]?.score ? 
                data?.awards[data?.awards.length -1]?.score : "0"}  </h6> <p className='font-medium text-lg'> Over All Score</p></div>
                </div>
                <div className='mainChart'>
                <CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
                </div>
            </div>
           
        </div>
        <NavBar />
        </>
    )
}

export default Performance
