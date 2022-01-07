import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { useFormik } from 'formik';

function Learnings() {
	const formik = useFormik({
		initialValues:{
			technology:"",
			platform:"",
			courseType:"",
			duration:"",
			resourceURL:"",
			date:"",
			approver:"",
			comments:"",

		},
		onSubmit: values=> {
		  console.log(values)
	
		},
		validate: values=>{
		  let error={}
		  if(!values.technology) {
			error.technology="*Required"
		  }
		  if(!values.platform) {
			error.platform="*Required"
		  }
		  if(!values.courseType) {
			error.courseType="*Required"
		  }
		  if(!values.resourceURL) {
			error.resourceURL="*Required"
		  }
		  if(!values.duration) {
			error.duration="*Required"
		  }
		  if(!values.date) {
			error.date="*Date Required"
		  }
		  if(!values.approver) {
			error.approver="*Required"
		  }
		  
		  return error
		}
	})
    return (
        <> 
        <div className='viewPay'>
            <div>
            <div className="container my-5 tableView py-4 ">
            <h6 className='text-center font-semibold'>Course Enrolled</h6>
                        <table className="table-auto border-collapse  w-100 text-center">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Course Name
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Technology
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Duration
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Status
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Enrolled Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white border border-gray-400">
                                <tr className="whitespace-nowrap">
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                    Python and ML for Beginners
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                        TensorFlow
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500">    6 months</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                    On Going
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                    30-12-2021
                                    </td>
                                </tr>
                        
    
                        
                            </tbody>
                        </table>
                    </div>
                    <div className="container mx-auto mainForm mb-4">
			<div className="flex justify-center px-6 mb-7">
			
				<div className="w-full  flex">
					
					<div className="w-full p-1 rounded-lg lg:rounded-l-none">
						<form onSubmit={formik.handleSubmit} className="px-2 pt-1 pb-4 mb-2" >
							<div className="mb-4 md:flex md:justify-between">
								<div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
										Technology
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										id="firstName"
										type="text"
										name="technology"
										onChange={formik.handleChange}
										value={formik.values.technology}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.technology && formik.errors.technology ? <small className='error'> {formik.errors.technology} </small> : null}
								</div>
								
                                <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
                                            Platform
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										id="platform"
										type="text"
										name="platform"
										onChange={formik.handleChange}
										value={formik.values.platform}
										onBlur={formik.handleBlur}
									/>
									  {formik.touched.platform && formik.errors.platform ? <small className='error'> {formik.errors.platform} </small> : null}
								</div>
                                <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
										Course Type 
									</label>
									<select name="courseType"
									className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline" 
									id="courseType"
									onChange={formik.handleChange}
									value={formik.values.courseType}
									onBlur={formik.handleBlur}>
										<option selected >Select:</option>
											<option value="Online">Online</option>
											<option value="Offline">Offline</option>
											</select>
											{formik.touched.courseType && formik.errors.courseType ? <small className='error'> {formik.errors.courseType} </small> : null}
								</div>
	
                                <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
                                    Resource URL
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
			
										type="text"
										name="resourceURL"
										onChange={formik.handleChange}
										value={formik.values.resourceURL}
										onBlur={formik.handleBlur}
									/>
									  {formik.touched.resourceURL && formik.errors.resourceURL ? <small className='error'> {formik.errors.resourceURL} </small> : null}
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
										Approver
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										
										type="text"
										name="approver"
										onChange={formik.handleChange}
										value={formik.values.approver}
										onBlur={formik.handleBlur}
									/>
									  {formik.touched.approver && formik.errors.approver ? <small className='error'> {formik.errors.approver} </small> : null}
								</div>
								<div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
                                    Duration
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
			
										type="text"
										name="duration"
										onChange={formik.handleChange}
										value={formik.values.duration}
										onBlur={formik.handleBlur}
									/>
									  {formik.touched.duration && formik.errors.duration ? <small className='error'> {formik.errors.duration} </small> : null}
								</div>
                                <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
										Comments
									</label>
									<textarea
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										id="remarks"
										name="comments"
                                        rows="3" cols="35"
									></textarea>
								</div>

							
							</div>
				
							<div className="mb-2 text-center flex justify-end">
								<button
									className="button-1"
									type="submit"
								>
									Request Course
								</button>
							</div>
						
						</form>
					</div>
                    
				</div>
			</div>
            
		</div>
            </div>
            
        </div>
        <NavBar  />
        </>
    )
}

export default Learnings
