import React, {useEffect, useState} from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import "./styles.css"
import ViewSlip from './viewSlip'
import {getMonths} from "../../../api/employee"
import { Link } from 'react-router-dom'
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

function ViewPaySlip() {
  const [viewed, setViewed] = useState(false)
  const navigate = useNavigate()
  const {data} = useSelector(state=> state.employee)
  const [months, setMonths] = useState({})
  const [currentSlip, setCurrentSlip] = useState({})
  const handleView = (ele)=>{
    setCurrentSlip(ele)
    setViewed((prev) => !prev)

  }
  const handleClose = (value)=> {
    setViewed(value)
}
useEffect(()=>{
  getMonths().then(res=> setMonths(res.data))
  .catch(err=> alert(err.response.data.message))
}, [navigate])

    return (
        <>
        <div className='viewPay'>
        <nav className="rounded-md w-full">
  <ol className="list-reset flex">
    <li> <Link to="/selfservice">Self Service </Link></li>
    <li><span className="text-gray-500 mx-2">/</span></li>
    <li className="text-gray-500">View Pay-Slip</li>
  </ol>
</nav>
          {viewed ? <div  className="overflow-x-auto"> <ViewSlip data={data} months={months} currentSlip={currentSlip} handleClose={handleClose} /> </div> :
        <div className='separationStatus'>
            <h5 className='mt-4 mb-2 text-center pt-4 font-semibold'>Payment Information</h5>
     <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        {data?.payments ?         <table className="min-w-full">
          <thead className="border-b">
            <tr>
              <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                #
              </th>
              <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                Month
              </th>
              <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
              Working Days
              </th>
              <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
              Days Payable
              </th>
              <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
              Allowance
              </th>
              <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
              Deductions
              </th>
              <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
              Net Pay
              </th>
              <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
              Actions
              </th>
              
            </tr>
          </thead>
          <tbody>
        {data.payments.map((ele, i)=>{
          return (
            <tr key={i} className="border-b font-medium">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">     {i+1} </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {months[ele.month-1]?.month  }
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {months[ele.month-1]?.days  }
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {ele.daysWorked}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {ele.allowance}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {ele.deductions}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {ele.amountPayable}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex justify-around border-none">
                <button className='button-1' onClick={()=>handleView(ele)}>View Slip </button>
                {/* <button className='button-2' >Download Slip </button> */}

            </td>
          </tr>
          )
        })}

           
          </tbody>
        </table> : <div className='flex  justify-center'> <p>No Transcation done yet</p> </div> }

      </div>
    </div>
  </div>
</div>

            </div>
            }
                <div className='SlipForm'>

                </div>
            
        </div>
        <NavBar />
        </>
    )
}

export default ViewPaySlip
