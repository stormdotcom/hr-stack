import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import NavBar from '../../components/NavBar/NavBar'
import {getHoliday, submitLeave, checkLeaveStatus} from "../../api/employee"
import { Alert, CircularProgress } from '@mui/material';
import Swal  from "sweetalert2"
import moment from "moment"
import  weekday from 'weekday';
import "./styles.css"
import { useFormik } from 'formik';
import { initial, errorfetching, fetchLeaveStatus, gotData} from "../../redux/employee/employeeSlice"
import { useNavigate } from 'react-router-dom';
function Leave() {
	const user = JSON.parse(localStorage.getItem('employee')).result
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const {isloading, data, error1, leaveReq} = useSelector(state=> state.employee)
	const  [holiday, setHoliday]= useState(0);
	const submitHandle = async (values)=>{
		dispatch(initial())
		let form= {...data, ...values}
		await submitLeave(form)
		.then(res=> {
			dispatch(gotData())
			Swal.fire({
				title: 'Success!',
				text: 'Leave Request Submitted',
				icon: 'success',
				confirmButtonText: 'OK'
			  })
		})
		.catch(err=> {	
			dispatch(gotData())
			Swal.fire({
			title: 'Submission Failed!',
			text: err.message,
			icon: 'info',
			confirmButtonText: 'OK'
		  })})
	}
	const formik = useFormik({
		initialValues:{
			leaveType:"",
			fromDate:"",
			toDate:"",
			manager:"",
			reason:""
		},
		onSubmit: (values, {resetForm})=> {
			submitHandle(values)
			resetForm()
		},
		validate: values=>{
		  let error={}
		  if(!values.leaveType) {
			error.leaveType="*Required"
		  }
		  if(!values.fromDate) {
			error.fromDate="*Date Required"
		  }
		  if(!values.toDate) {
			error.toDate="*Date Required"
		  }
		  if(!values.manager) {
			error.manager="*Required"
		  }
		  if(!values.reason) {
			error.reason="*Required! Reason in detail"
		  }
		  
		  return error
		}
	})

	useEffect(() => {
		getHoliday().then(res => {
			setHoliday(res.data.holiday)
		}).catch(err=> dispatch(errorfetching(err.data)))
		checkLeaveStatus(user._id).then((res)=> dispatch(fetchLeaveStatus(res.data)))
					.catch(err => dispatch(errorfetching(err.message)))
	  }, [navigate]) 
	  const handleView = (data, type)=>{
		Swal.fire({
			title: '<strong>'+  type +'</strong>',
			html:+"\n"+ data+  "\n",
			showCloseButton: true,
			showCancelButton: true,
			focusConfirm: false,
		})
	}

    return (
        <>
        <div className="viewPay">
            <div className='leaveForm'>
				{error1 && <div> <Alert severity='warning'> {error1} </Alert> </div>}
                <div className='topSecLeave'>
                    <div className='leaveInfoCard'> <h5 className='font-bold'>Causal Leave Balance</h5> <h4  className='font-bold'>{data?.leaveBalance?.casual} </h4> </div>
                    <div className='leaveInfoCard'> <h5 className='font-bold'>Holidays this Year</h5> <h4  className='font-bold'>{holiday} </h4>  </div>
                    <div className='leaveInfoCard'> <h5 className='font-bold'>Sick Leave Balance</h5> <h4  className='font-bold'>{data?.leaveBalance?.sick} </h4>  </div>

                </div>
				{leaveReq ? <div className="container my-5 tableView py-4 overflow-x-auto">
				<h6 className='text-center font-semibold'>Leave Status</h6>
                        <table className="table-auto border-collapse  w-100 text-center">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
									Leave Type
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
									From Date
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
									To Date
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Status
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Comments
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white border border-gray-400">
								{leaveReq.map((ele, i)=>{
									return (
										<tr key={i} className="whitespace-nowrap">
										<td className="px-6 py-4 text-sm text-gray-500">
									
										{ele.leaveType} Leave
										</td>
										<td className="px-6 py-4">
											<div className="text-sm text-gray-900">
										
											{moment(ele.fromDate).utcOffset("+05:30").format('DD-MM-YYYY') }	&nbsp;
											{weekday(moment(ele.fromDate).week())}
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="text-sm text-gray-500"> 
											 {moment(ele.fromDate).utcOffset("+05:30").format('DD-MM-YYYY')} 	&nbsp;
											 {weekday(moment(ele.fromDate).week())}
											  </div>
										</td>
										<td className="px-6 py-4 text-sm text-gray-500">
										{(ele.submittedStatus && ele.approvedStatus) && "Approved" }
										{!ele.submittedStatus  && "Pending" } 
										{(ele.submittedStatus && !ele.approvedStatus) && "Rejected" }
										</td>
										<td className="px-6 py-4 text-sm">
										{(ele.submittedStatus && !ele.approvedStatus) && 
										 <div className='button-sm-1'onClick={()=>handleView(ele.comments, "Rejected Reason")}>View Comment </div>}
										</td>
									</tr>
									)
								})}
                           
                            </tbody>
                        </table>
						</div> : ""}
			
				<div >

				</div>
                <div className="container mx-auto mb-8 mainForm">
			<div className="flex justify-center px-6 my-12">
			
				<div className="w-full  flex">
					{ (data.leaveBalance.casual && data.leaveBalance.sick) ?
					<div className="w-full p-1 rounded-lg lg:rounded-l-none">
						<form onSubmit={formik.handleSubmit} className="px-2 pt-1 pb-4 mb-2">
						
							<div className="mb-4 md:flex md:justify-between">
								<div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
										Leave Type
									</label>
									<select name="leaveType"
									className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline" 
									id="leaveType"
									onChange={formik.handleChange}
									value={formik.values.leaveType}
									onBlur={formik.handleBlur}>
										<option  value="">Select:</option>
											<option defaultValue value="Casual">Casual</option>
											<option value="Sick">Sick</option>
											</select>
											{formik.touched.leaveType && formik.errors.leaveType ? <small className='error'> {formik.errors.leaveType} </small> : null}
								</div>
                                <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
                                            From Date
									</label>
									<input
										className="w-full px-5 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										id="fromDate"
										type="date"
										name="fromDate"
										onChange={formik.handleChange}
										value={formik.values.fromDate}
										onBlur={formik.handleBlur}
									/>

										{formik.touched.fromDate && formik.errors.fromDate ? <small className='error'> {formik.errors.fromDate} </small> : null}
								</div>
                                <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
										To Date
									</label>
									<input
										className="w-full px-5 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										id="toDate"
										type="date"
										name="toDate"
										onChange={formik.handleChange}
										value={formik.values.toDate}
										onBlur={formik.handleBlur}
									/>
										{formik.touched.toDate && formik.errors.toDate ? <small className='error'> {formik.errors.toDate} </small> : null}
								</div>
							
							</div>

                            <div className="mb-4 md:flex md:justify-between">
								<div className="mb-4 md:mr-2 md:mb-0">
									<label htmlFor='manager' className="block mb-2 text-sm font-medium text-gray-700" >
										Reporting Manager
									</label>
									<input
										list="manager"
										className="w-full px-5 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										id="manager"
										type="text"
										name="manager"
										onChange={formik.handleChange}
										value={formik.values.manager}
										onBlur={formik.handleBlur}
									/>
										<datalist id="manager"><option value={data?.projectAllocated?.proManager} /></datalist>
										{formik.touched.manager && formik.errors.manager ? <small className='error'> {formik.errors.manager} </small> : null}
								</div>
               
                                <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
										Reason
									</label>
									<textarea
										className="w-full px-5 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										id="reason"
										name="reason"
                                        rows="3" cols="84"
										onChange={formik.handleChange}
										value={formik.values.reason}
										onBlur={formik.handleBlur}
									></textarea>
										{formik.touched.reason && formik.errors.reason ? <small className='error'> {formik.errors.reason} </small> : null}
								</div>		
							</div>
				
							<div className="mb-2 text-center flex justify-end">
								{isloading && <div className='flex justify-center'><CircularProgress /> </div> }
								<button
									className="button-1"
									type="submit"
								>
									Submit
								</button>
							</div>
						
						</form>
					</div>
					: <div className='flex justify-center'> <p>No leave Balance Contact HR</p> </div> }
                    
				</div>
			</div>
            
		</div>
            </div>
            
        </div>
        <NavBar />
        </>

    )
}

export default Leave
