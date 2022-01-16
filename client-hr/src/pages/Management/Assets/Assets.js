import React from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import "./styles.css"

function Assets() {
	const formik = useFormik({
		initialValues:{
			pickupPoint:"",
			dropPoint:"",
			time:"",
			projectName:"",
			date:"",
			jobLocation:"",
			employeeName:"",
			asset:"",
			assetType:"",
			employeeID:"",
			contactNumber:""



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
		  if(!values.asset) {
			error.asset="*Required"
		  }
		  if(!values.date) {
			error.date="*Required"
		  }
		  if(!values.asset) {
			error.asset="*Required"
		  }
		  if(!values.assetType) {
			error.assetType="*Required"
		  }
		  if(!values.jobLocation) {
			error.jobLocation="*Required"
		  }


		  
		  return error
		}
	})
    return (
        <>
        <div className='viewPay'>
            <div className='assetRequest'>
			<nav className="rounded-md w-full">
  <ol className="list-reset flex">
    <li> <Link to="/selfservice">Self Service </Link></li>
    <li><span className="text-gray-500 mx-2">/</span></li>
    <li className="text-gray-500">Assets</li>
  </ol>
</nav>

        <div className="container my-5 tableView py-4">
            <h6 className='text-center font-semibold'>Assets Holding</h6>
                        <table className="table-auto border-collapse  w-100 text-center">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Asset Name
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Asset Code
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Asset Type
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Asset Model
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Occupied Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white border border-gray-400">
                                <tr className="whitespace-nowrap">
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                    EC-Lap-001
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                        EC1231
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500">    Laptop</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                    Lenova Think Pad T430s
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                    30-12-2021
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
										Asset 
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										id="asset"
										type="text"
										name="asset"
										onChange={formik.handleChange}
										value={formik.values.asset}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.asset && formik.errors.asset ? <small className='error'> {formik.errors.asset} </small> : null}
								</div>
                                <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
                                    Asset Type
									</label>
									<select name="assetType"
									className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline" 
									id="assetType"
									onChange={formik.handleChange}
									value={formik.values.assetType}
									onBlur={formik.handleBlur}>
										<option defaultValue="" >Select:</option>
											<option value="Low">Computers</option>
											<option value="Offline">Others</option>
											</select>
											{formik.touched.assetType && formik.errors.assetType ? <small className='error'> {formik.errors.assetType} </small> : null}
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
										Job Location
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										
										type="text"
										name="jobLocation"
										onChange={formik.handleChange}
										value={formik.values.jobLocation}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.jobLocation && formik.errors.jobLocation ? <small className='error'> {formik.errors.jobLocation} </small> : null}
								</div>
                                <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
										Remarks
									</label>
									<textarea
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										id="remarks"
										name="remarks"
                                        rows="3" cols="71"
									
									></textarea>
								</div>

							
							</div>
				
							<div className="mb-2 text-center flex justify-end">
								<button
									className="button-1"
									type="submit"
								>
									Request Asset
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

export default Assets
