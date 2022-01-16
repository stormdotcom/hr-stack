import React from 'react'
import "./styles.css"
import NavBar from '../../components/NavBar/NavBar'
import CanvasJSReact from './canvasjs.react'
import {SiStyleshare} from "react-icons/si"
import {BsTrophyFill} from "react-icons/bs"
import {GiStarMedal} from "react-icons/gi"

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Performance() {
  
   
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
                {"label":"Attendance","y":98},
                {"label":"Project Completion","y":100},
                {"label":"Over All Participation","y":90},
                {"label":"Others","y":90},  
            ]
        }]
    }
    return (
        <>
      
        <div className='viewPay'>
            <div className='performanceView'>
                <div className='topCards'> 
                <div className='cardPerformance'><SiStyleshare className="text-primary text-4xl" /> <h6 className='font-bold text-lg'> 3</h6><p className='font-medium text-lg'> Contribitions </p> </div>
                <div className='cardPerformance'><BsTrophyFill  className="text-primary text-4xl"/> <h6 className='font-bold text-lg'>4</h6> <p className='font-medium text-lg'> Accomplishments </p></div>
                <div className='cardPerformance'><GiStarMedal  className="text-primary text-4xl"/> <h6 className='font-bold text-lg'>3.5 / 10</h6> <p className='font-medium text-lg'> Over All  Rating</p></div>
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
