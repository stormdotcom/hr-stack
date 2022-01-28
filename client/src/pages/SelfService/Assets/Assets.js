import React, {useEffect, useState} from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import "./styles.css"
import { useSelector } from 'react-redux';	
import Swal from "sweetalert2"
import {submitAssetReq, getMyassets} from "../../../api/employee"
import moment from "moment"
function Assets() {
	const navigate = useNavigate()
	const { data } = useSelector(state=> state.employee)
	const [myassets, setMyassets] = useState([])
	const handleSubmit= async (values)=>{
		let form ={userID:data.userID, ...values,}
		await submitAssetReq(form).then(()=>{
			Swal.fire({
				title: 'Success!',
				text: 'Asset Request Submitted',
				icon: 'success',
				confirmButtonText: 'OK'
			  })
		}).catch((err)=>{
			Swal.fire({
				title: 'Failed!',
				text: 'Submission Failed',
				icon: 'info',
				confirmButtonText: 'OK'	  
		})
	})
}
	const formik = useFormik({
		initialValues:{
			projectName:data?.projectAllocated?.Project,
			jobLocation:data?.jobLocation,
			employeeName:data?.fullname,
			asset:"",
			assetType:"",
			employeeID:data?.empID,
			comments:""
		},
		onSubmit: (values, {resetForm})=> {
		  handleSubmit(values)
		  resetForm()
	
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
	useEffect(()=>{
		getMyassets(data.userID).then((res)=> setMyassets(res.data))
		.catch((err)=> Swal.fire({title: 'Failed!',text: err.message,	icon: 'info',confirmButtonText: 'OK'}))
		return () => { setMyassets([])};
	}, [navigate])
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
			{myassets.length ? 
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
								{myassets.map((ele, i)=>{
									return (
										<tr className="whitespace-nowrap">
                                    <td className="text-left px-6 py-4 text-sm  text-gray-500">
                                    {ele.assetName}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                        {ele?.assetCode}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500"> {ele?.assetModel}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
									{ele?.assetType}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
									{moment(ele.alloactedDate).utcOffset("+05:30").format('DD-MM-YYYY')} 
                               
                                    </td>
                                </tr>
									)
								})}

                            </tbody>
                        </table> :  <div className='flex justify-center my-1'> <p> No assets holding </p> </div>}
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
											<option value="Computers">Computers</option>
											<option value="Others">Others</option>
											</select>
											{formik.touched.assetType && formik.errors.assetType ? <small className='error'> {formik.errors.assetType} </small> : null}
								</div>
							
							</div>

                            <div className="mb-4 md:flex md:justify-between">
								<div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
										Project
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
										Comments
									</label>
									<textarea
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										id="remarks"
										name="comments"
										onChange={formik.handleChange}
										value={formik.values.comments}
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
