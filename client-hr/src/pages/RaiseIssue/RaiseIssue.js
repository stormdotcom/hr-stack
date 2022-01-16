import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import "./styles.css"
import { useFormik } from 'formik';

function RaiseIssue() {
	const formik = useFormik({
		initialValues:{
			employeeName:"",
			employeeID:"",
			team:"",
			date:"",
			manager:"",
			priority:"",
			subject:"",
			issue:"",

		},
		onSubmit: (values)=> {
		  console.log(values)
	
		},
		validate: values=>{
		  let error={}
		  if(!values.employeeName) {
			error.employeeName="*Required"
		  }
		  if(!values.employeeID) {
			error.employeeID="*Required"
		  }
		  if(!values.team) {
			error.team="*Required"
		  }
		  if(!values.date) {
			error.date="*Required"
		  }
		  if(!values.priority) {
			error.priority="*Required"
		  }
		  if(!values.manager) {
			error.manager="*Required"
		  }
		  if(!values.subject) {
			error.subject="*Date Required"
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
            <h6 className='text-center font-semibold'>Ticket List</h6>
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
                                <tr className="whitespace-nowrap">
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                    EC-ISSUE-1001
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                        AntiVirus Installation
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                   Resolved
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                    30-12-2021
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                    <button className='button-1' >View  </button>
                                    </td>
                                </tr>
                        
    
                        
                            </tbody>
                        </table>
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
										onChange={formik.handleChange}
										value={formik.values.employeeName}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.employeeName && formik.errors.employeeName ? <small className='error'> {formik.errors.employeeName} </small> : null}
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
										onChange={formik.handleChange}
										value={formik.values.employeeID}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.employeeID && formik.errors.employeeID ? <small className='error'> {formik.errors.employeeID} </small> : null}
								</div>
								
                                <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
										Team
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										id="team"
										type="text"
										name="team"
										onChange={formik.handleChange}
										value={formik.values.team}
										onBlur={formik.handleBlur}
									/>
										{formik.touched.team && formik.errors.team ? <small className='error'> {formik.errors.team} </small> : null}
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
										<option defaultValue="" >Select:</option>
											<option value="Low">Low</option>
											<option value="Offline">Medium</option>
											</select>
											{formik.touched.priority && formik.errors.priority ? <small className='error'> {formik.errors.priority} </small> : null}
								
								</div>
								
             

							
							</div>

                            <div className="mb-4 md:flex md:justify-between">
                            <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
                                    Date
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
			
										type="date"
										name="date"
										onChange={formik.handleChange}
										value={formik.values.date}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.date && formik.errors.date ? <small className='error'> {formik.errors.date} </small> : null}
								</div>
                                <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
                                    Reporting Manager
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
			
										type="text"
										name="manager"
										onChange={formik.handleChange}
										value={formik.values.manager}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.manager && formik.errors.manager ? <small className='error'> {formik.errors.manager} </small> : null}
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
                                        rows="3" cols="31"
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
