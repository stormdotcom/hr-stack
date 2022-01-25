import React, {useEffect} from 'react'
import NavBar from '../../components/NavBar/NavBar'
import "./styles.css"
import { useFormik } from 'formik';
import {useSelector, useDispatch} from "react-redux"
import {submitTicket, myTickets} from "../../api/employee"
import {fetchMyticket, errorfetching, initial} from "../../redux/requests/requestSlice"
import Swal from "sweetalert2"
import { useNavigate } from 'react-router-dom';
import {Alert} from "@mui/material"
function RaiseIssue() {
	const {data }= useSelector(state => state.employee)
	const { myticket, error }= useSelector(state => state.request)

	const dispatch = useDispatch()
	const navigate = useNavigate()
	useEffect(() => {
		dispatch(initial())
		myTickets(data.userID).then((res=> dispatch(fetchMyticket(res.data))))
		.catch(err=> dispatch(errorfetching(err.message)))
	}, [navigate])
    const handleView = (data)=>{
        Swal.fire({
            title: '<strong> Comment</strong>',
            html:
              '</br>'
              +"\n"+ data+  "\n",
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
          })
    }
	const formik = useFormik({
		initialValues:{
			manager:"",
			priority:"",
			subject:"",
			issue:"",

		},
		onSubmit: async (values, {resetForm})=> {
			let  date = new Date()
			let  {userID, fullname, empID, projectAllocated} = data;
			let { proManager, Project} = projectAllocated
			let form = {...values, userID,date, employeeName:fullname, employeeID:empID, proManager, project:Project, manager:proManager}
			submitTicket(form).then((res)=> Swal.fire(   'Success!',   'Ticket Created! Support Team will Contact you shortly',   'success' ))
								.catch((err)=>{ console.log(err.message) 
									Swal.fire(   'Failed!',   'Cant create ticket!',   'info' )
								})
		  console.log(form)
		  resetForm()
		},
		validate: values=>{
		  let error={}
	
		  if(!values.priority) {
			error.priority="*Required"
		  }
		  if(!values.subject) {
			error.subject="*Subject Required"
		  }
		  if(!values.issue) {
			error.issue="*Issue in detail Required"
		  }
		  
		  return error
		}
	})
    return (
        <>
        <div className='viewPay'>
            <div className='assetRequest'>

        <div className="container my-5 tableView py-4 raiseIssueTable">
		{error && <Alert severity='warning'> {error} </Alert>}
            <h6 className='text-center font-semibold'>Ticket List</h6>
			
			{myticket ?  
			<table className="table-auto border-collapse  w-100 text-center ">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Ticket ID
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Subject
                                    </th>

                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Status
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Created On
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Comments
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white border border-gray-400">
								{myticket.map((ele, i)=>{
									return(
										<tr className="whitespace-nowrap">
										<td className="px-6 py-4 text-sm text-gray-500">
										{ele._id.substr(ele._id.length - 4).toUpperCase()}
										</td>
										<td className="px-6 py-4">
											<div className="text-sm text-gray-900">
											{ele.subject}
											</div>
										</td>
										<td className="px-6 py-4 text-sm text-gray-500">
									   {ele.resolved ? "Resolved": "Pending"}
									   {ele.ondelay && "Resolving Started"}
										</td>
										<td className="px-6 py-4 text-sm">
										30-12-2021
										</td>
										<td className="px-6 py-4 text-sm">
											{!ele.comments ? "-" : <button className='button-1' onClick={()=>{handleView(ele.comments)}} >View  </button>}
										
										</td>
									</tr>
									)
								})}  
                            </tbody>
                        </table>: "No previous active list"}

                    </div>
                    <div className="container mx-auto mainForm">
			<div className="flex justify-center px-6 my-12">
				<div className="w-full  flex">
					<div className="w-full p-1 rounded-lg lg:rounded-l-none">
						<form onSubmit={formik.handleSubmit} className="px-2 pt-1 pb-4 mb-2">
							<div className="mb-4 md:flex md:justify-between">
								<div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
										Employee Name
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										id="employeeName"
										type="text"
										name="employeeName"
										readOnly
										value={data.fullname}
										
									/>
									{ formik.errors.employeeName ? <small className='error'> {formik.errors.employeeName} </small> : null}
								</div>
                                <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
                                            Employee ID
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										id="employeeID"
										type="text"
										name="employeeID"
										readOnly
										value={data.empID}
										
									/>
									{ formik.errors.employeeID ? <small className='error'> {formik.errors.employeeID} </small> : null}
								</div>
								
							
                                <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
                                    Priority
									</label>
									<select name="priority"
									className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline" 
									id="priority"
									onChange={formik.handleChange}
									value={formik.values.priority}
									onBlur={formik.handleBlur}>
										<option  >Select:</option>
											<option value="Low">Low</option>
											<option value="Medium">Medium</option>
											</select>
											{formik.touched.priority && formik.errors.priority ? <small className='error'> {formik.errors.priority} </small> : null}
								
								</div>
								
             

							
							</div>

                            <div className="mb-4 md:flex md:justify-between">
                                <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
                                    Reporting Manager
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										type="text"
										name="manager"
										defaultValue={data?.projectAllocated?.proManager}
									/>
									{ formik.errors.manager ? <small className='error'> {formik.errors.manager} </small> : null}
								</div>
								<div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
                                    Subject
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
			
										type="text"
										name="subject"
										onChange={formik.handleChange}
										value={formik.values.subject}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.subject && formik.errors.subject ? <small className='error'> {formik.errors.subject} </small> : null}
								</div>
								             
                            <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
										Issue in detail
									</label>
									<textarea
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										id="remarks"
										name="issue"
                                        rows="4" cols="40"
										onChange={formik.handleChange}
										value={formik.values.issue}
										onBlur={formik.handleBlur}
									></textarea>
									{formik.touched.issue && formik.errors.issue ? <small className='error'> {formik.errors.issue} </small> : null}
								</div>
							</div>
				
							<div className="mb-2 text-center flex justify-end">
								<button
									className="button-1"
									type="submit"
								>
									Raise this Issue
								</button>
							</div>
						
						</form>
					</div>
                    
				</div>
			</div>
            
		</div>
        
            </div>
    
        </div>
         <NavBar />
         </>
    )
}

export default RaiseIssue
