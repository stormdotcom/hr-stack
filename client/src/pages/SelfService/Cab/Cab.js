import React from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import "./styles.css"
import { Link } from 'react-router-dom'
import {useFormik} from "formik"
function Cab() {
	const formik = useFormik({
		initialValues:{
			employeeName:"",
			pickupPoint:"",
			dropPoint:"",
			time:"",
			projectName:"",
			contactNumber:""

		},
		onSubmit: values=> {
			
		  console.log(values)
	
		},
		validate: values=>{
		  let error={}
		  if(!values.employeeName) {
			error.employeeName="*Required"
		  }
		  if(!values.pickupPoint) {
			error.pickupPoint="*Required"
		  }
		  if(!values.dropPoint) {
			error.dropPoint="*Required"
		  }
		  if(!values.time) {
			error.time="*Required"
		  }
		  if(!values.projectName) {
			error.projectName="*Required"
		  }
		  if(!values.contactNumber) {
			error.contactNumber="*Required"
		  }


		  
		  return error
		}
	})
    return (
        <>
        <div className='viewPay'>
            <div className='cabRequest'>
			<nav className="rounded-md w-full">
  <ol className="list-reset flex">
    <li> <Link to="/selfservice">Self Service </Link></li>
    <li><span className="text-gray-500 mx-2">/</span></li>
    <li className="text-gray-500">Vehicle Request</li>
  </ol>
</nav>
            <div className="container mx-auto mainForm">
			<div className="flex justify-center px-6 my-12">
			
				<div className="w-full  flex">
					
					<div className="w-full p-1 rounded-lg lg:rounded-l-none">
						<form onSubmit={formik.handleSubmit} className="px-2 pt-1 pb-4 mb-2">
							<div className="mb-4 md:flex md:justify-between">
								<div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
										Pick-Up Point
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										id="firstName"
										type="text"
										name="pickupPoint"
										onChange={formik.handleChange}
										value={formik.values.pickupPoint}
										onBlur={formik.handleBlur}
									/>
										{formik.touched.pickupPoint && formik.errors.pickupPoint ? <small className='error'> {formik.errors.pickupPoint} </small> : null}
								</div>
                                <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
										Drop Point
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										id="dropPoint"
										type="text"
										name="dropPoint"
										onChange={formik.handleChange}
										value={formik.values.dropPoint}
										onBlur={formik.handleBlur}
									/>
										{formik.touched.dropPoint && formik.errors.dropPoint ? <small className='error'> {formik.errors.dropPoint} </small> : null}
								</div>
                                <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
										Pick Up Time
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										id="time"
										type="time"
										name="time"
										onChange={formik.handleChange}
										value={formik.values.time}
										onBlur={formik.handleBlur}
									/>
										{formik.touched.time && formik.errors.time ? <small className='error'> {formik.errors.time} </small> : null}
								</div>
                                <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
										Project Name
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
			
										type="text"
										name="projectName"
										onChange={formik.handleChange}
										value={formik.values.projectName}
										onBlur={formik.handleBlur}
									/>
										{formik.touched.projectName && formik.errors.projectName ? <small className='error'> {formik.errors.projectName} </small> : null}
								</div>
							
							</div>

                            <div className="mb-4 md:flex md:justify-between">
								<div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
										Employee Name
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										
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
										Contact Number
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
								
										type="text"
										name="contactNumber"
										onChange={formik.handleChange}
										value={formik.values.contactNumber}
										onBlur={formik.handleBlur}
									/>
										{formik.touched.contactNumber && formik.errors.contactNumber ? <small className='error'> {formik.errors.contactNumber} </small> : null}
								</div>
                                <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
										Remarks
									</label>
									<textarea
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										id="remarks"
										type="time"
										name="remarks"
                                        rows="3" cols="61"
									></textarea>
								</div>

							
							</div>
				
							<div className="mb-2 text-center flex justify-end">
								<button
									className="button-1"
									type="submit"
								>
									Submit
								</button>
							</div>
						
						</form>
					</div>
                    
				</div>
			</div>
            
		</div>
        <div className="container my-5 tableView py-4">
                        <table className="table-auto border-collapse  w-100 text-center">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Employee Name & Contact Details
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Pick-Up Point
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Drop Point
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Pick-Up Time
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Current Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white border border-gray-400">
                                <tr className="whitespace-nowrap">
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                    ₹ 45000.00
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                        ₹1020.00
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500">    ₹2020.00</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                    %10
                                    </td>
                                    <td className="px-6 py-4">
                                    ₹500020.00
                                    </td>
                                </tr>
                        
    
                        
                            </tbody>
                        </table>
                    </div>
        
            </div>
    
        </div>
         <NavBar />
         </>
    )
}

export default Cab
