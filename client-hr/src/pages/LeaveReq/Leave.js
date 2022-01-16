import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import "./styles.css"
import { useFormik } from 'formik';
function Leave() {
	const formik = useFormik({
		initialValues:{
			leaveType:"",
			fromDate:"",
			toDate:"",
			manager:"",
			reason:""

		},
		onSubmit: values=> {
		
		  console.log(values)
	
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
    return (
        <>
        <div className="viewPay">
            <div className='leaveForm'>
                <div className='topSecLeave'>
                    <div className='leaveInfoCard'> <h5 className='font-bold'>Causal Leave Balance</h5> <p>1 </p> </div>
                    <div className='leaveInfoCard'> <h5 className='font-bold'>Holidays this Year</h5> <p>3 </p>  </div>
                    <div className='leaveInfoCard'> <h5 className='font-bold'>Sick Leave Balance</h5> <p>1 </p>  </div>

                </div>
                <div className="container mx-auto mb-8 mainForm">
			<div className="flex justify-center px-6 my-12">
			
				<div className="w-full  flex">
					
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
									<label className="block mb-2 text-sm font-medium text-gray-700" >
										Reporting Manager
									</label>
									<input
										className="w-full px-5 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										
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
            </div>
            
        </div>
        <NavBar />
        </>

    )
}

export default Leave
