import React, {useEffect, useState} from 'react';
import "./styles.css"
import NavBar from "../../components/NavBar/NavBar"
import {getAllEmployeesName, getFullData, getMonth, getCurrentMonthTmeSheet, submitPayment} from "../../api/api"
import {Alert,CircularProgress} from "@mui/material"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Swal from 'sweetalert2'
function Transcations() {
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([])
    const [form, setForm] = useState({})
    const [employee, setEmployee] = useState(null)
    const [months, setMonths] = useState([])
    const [err, seterr] = useState(null)
    const [id, setId] = useState(0)
    const [selectedMonth, setselectedMonth] = useState(0)
    const [newAllWorkedDay, setNewAllWorkedDay] = useState([])
    const [isLoading, setLoading] = useState(false);
    const [isLoading2, setLoading2] = useState(false);
    const dateNow  = new Date();
    const currentMonth = dateNow.getMonth()+1;
    const [amount, setAmount] = useState(newAllWorkedDay.length * 2000)
    useEffect(() => {
      getAllEmployeesName().then(res=> setEmployees(res.data))
      .catch(err=> console.log(err.message))

      getMonth().then(res => setMonths(res.data))
      .catch(err => console.log(err.message))

      return (()=> {
        setEmployee({})
      })
    }, [navigate]);
    const resetForm = () => { 
      document.getElementById("salary-form").reset();
    }
    const handleSubmit = async (e) => {
      
      e.preventDefault()
      resetForm()
   const {allowance, deductions}=form;
   console.log(form)
   if(!allowance)  return seterr("Allownace field Empty! please enter a amount")
   if(!deductions) return seterr("Deductions field  Empty! please enter a amount")
   let amountPayable = (newAllWorkedDay.length) * 2000 + Number(allowance) - Number(deductions)
   let formData = {id, amountPayable, allowance:Number(allowance), deductions:Number(deductions), month:Number(selectedMonth),date:new Date()  }
   await submitPayment(formData).then(()=> {
    setLoading2(false)
     Swal.fire("Done!", "", "success")})
   .catch(err=>  Swal.fire(err.response.data.message, "", "info"))
   setLoading2(false)
      }
      const handleChange = (e)=> setForm({...form, [e.target.name]: e.target.value})



    useEffect(()=>{
       
    })
      const handleMonth =async (e)=>{
        setLoading(true)
        const month = e.target.value
        setselectedMonth(month)
        getCurrentMonthTmeSheet({userID:id, month:month}).then((res)=>{
          setLoading(false)
          setNewAllWorkedDay(res.data)
          setAmount(newAllWorkedDay.length * 2000)
        }).catch(err=> seterr(err.message))


         }
     const handleSelection = async (e)=>{
      setLoading(true)
      setId(e.target.value)
        getFullData(e.target.value)
        .then((res)=> {
          setLoading(false);
          seterr(null);
            setEmployee(res.data) 
        }).catch(err=> seterr(err.message))
            }
  return <>
        <div className='viewPay'>
            <div className=' mx-auto'> 
            {err &&  <div className='flex justify-center'><Alert severity="error"> {err}</Alert> </div>}
           
            <nav className="rounded-md w-full">
  <ol className="list-reset flex">
    <li> <Link to="/view-employees">Transcations </Link></li>
    <li><span className="text-gray-500 mx-2">/</span></li>
    <li className="text-gray-500">Payments</li>
  </ol>
</nav>
            <div className='flex space-x-1'> 
            <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/transactions')}} style={{backgroundColor:"#3283bd"}}> Payments</div>
                {/* <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/view-employees/view-skills')}}> Skills View</div>
                <div className='button-5 font-semibold text-sm my-1' onClick={()=>{navigate('/view-employees/managers')}}>  Managers</div> */}
                <div className='button-5 font-semibold text-sm my-1'  onClick={()=>{navigate('/transactions')}}> Others </div>
             </div>
            <div className='separationStatus'>
              <div className='flex justify-center py-3'>  
               <h5 className='flex text-center mx-3'> Pay Salary</h5>
               </div>
            
              { isLoading && <LinearProgress />}
                {employees.length ? 
            <form id="salary-form">
              <div className="flex justify-between align-middle rounded px-11 pt-6 mb-2">
                <div className="mb-1 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-medium text-gray-700" > Full Name</label>
                  <select
                  onChange={handleSelection}
                    className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                    name="type">
                        {employees.map((ele, i)=>{
                            return (
                                <option key={i}  value={ele._id}>{ele.fullname}</option>
                            )
                        })}

                  </select>
                </div>

            {employee && 
                <div className="mb-1 md:mr-2 md:mb-0">
                <label className="block mb-2 text-sm font-medium text-gray-700" > Month</label>
                <select
                onChange={handleMonth}
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  name="type">
                      {months.slice(0, currentMonth).map((ele, i)=>{
                          return (
                              <option key={i}  value={ele.number}>{ele.month}</option>
                          )
                      })}

                </select>
              </div>}
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                    type="hidden"
                    onChange={handleChange}
                    value={selectedMonth}
                    name="month"
                  />
                <div className="mb-1 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-medium text-gray-700" > Employee ID</label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                    type="text"
                    value={employee?.empID}
                    readOnly
                  />
                
                </div>
                <div className="mb-1 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-medium text-gray-700" > Project Name</label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                    type="text"
                    value={employee?.projectAllocated?.Project}
                    readOnly
                  />  
                </div>

              </div>

              <div className="flex justify-between align-middle rounded px-11 pt-6 mb-2">
              <div className="mb-1 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-medium text-gray-700" > No of Days Worked</label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                    type="number"
                    onChange={handleChange}
                    value={newAllWorkedDay?.length}
                    readOnly
                  />
                </div>
                <div className="mb-1 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-medium text-gray-700" > Amount</label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="mb-1 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-medium text-gray-700" > Deductions </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                    type="text"
                    name="deductions"
                    onChange={handleChange}
                  />
               
                </div>

                <div className="mb-1 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-medium text-gray-700" > Allowance</label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                    type="number"
                    name="allowance"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex justify-between align-middle rounded px-11 pt-6 mb-2">
              <div className="mb-1 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-medium text-gray-700" > ESI No</label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                    value={employee?.otherStatutoryInfo?.esiNo}
                    readOnly
                  />
                </div>
                <div className="mb-1 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-medium text-gray-700" > PF NO</label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                    value={employee?.otherStatutoryInfo?.pfNo}
                  />
                </div>
                <div className="mb-1 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-medium text-gray-700" > Bank Account Number</label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                    name="account"
                    value={employee?.bankDetails?.accountNumber}
                    readOnly
                  />
                </div>

                <div className="mb-1 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-medium text-gray-700" > IFSC Code</label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
              
                    name="ifsc"
                    value={employee?.bankDetails?.ifscCode}
                    readOnly
                  />
                  
                </div>
              </div>
              <div className="px-9 items-center justify-center ">
                {isLoading2 && (
                  <div className="flex justify-center items-center">
                    <CircularProgress color="info" size={20} />
                    <small className="px-1">Updating</small>
                  </div>
                )}
                <button  onClick={handleSubmit} className="flex button-1 w-full my-2 mb-2">
                  Initate Payment
                </button>
              </div>

            </form>
                : <div className='flex justify-center items-center'> <p>No employee Data Found</p> </div>}
               </div>
            </div>
         
        </div>

      <NavBar />
  </>;
}

export default Transcations;
