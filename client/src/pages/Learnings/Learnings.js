import React, {useEffect, useState} from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { useFormik } from 'formik';
import {submitLearningRequest, getMyLearnings} from "../../api/employee"
import {useSelector} from "react-redux"
import Swal from "sweetalert2"
import {useNavigate} from "react-router-dom"
import moment from "moment"
import YouTube from 'react-youtube';
import "./styles.css"
function Learnings() {
	const navigate = useNavigate()
	const {data} = useSelector(state => state.employee)
	const [learn, setLearn] = useState([])
	const [toggle, setToggle] =useState(true)
	const handleSubmit = async (values)=>{
		const {userID, empID, fullname, projectAllocated} = data
		let formData= {...values, fullname,userID, empID, requestedDate:new Date(), project:projectAllocated.Project}
		submitLearningRequest(formData)
		.then(()=> Swal.fire(   'Success!', 'Team will give access to this resource shortly','success' ))
		.catch(err => 	{ console.log(err.message)
			Swal.fire('Failed!','Cant Request!','info' )})
	} 
	const onReady = (e)=> {
		e.target.pauseVideo();
	  }
	const opts = {
		height: '170',
		width: '240',
		playerVars: {
		  autoplay: 1,
		},
	  };
	const formik = useFormik({
		initialValues:{
			courseName:"",
			technology:"",
			platform:"",
			courseType:"",
			duration:"",
			resourceURL:"",
			approver:"Manager",
			comments:"",

		},
		onSubmit: (values, {resetForm})=> {
			handleSubmit(values)
			resetForm()
	
		},
		validate: values=>{
		  let error={}  
		  if(!values.courseName) {
			error.courseName="*Required"
		  }
		  if(!values.comments) {
			error.comments="*Required"
		  }
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
		  return error
		}
	})
	useEffect(() => {
		getMyLearnings(data.userID).then((res)=> setLearn(res.data))
									.catch(err=> console.log(err.message))
	}, [navigate, data])
    return (
        <> 
        <div className='viewPay'>
		<div className='flex justify-start mb-5 aboveButton'> 
			<div className='button-sm-1 mx-1 text-sm p-2'  onClick={()=>setToggle(prev=> !prev)}> Request Course</div> 
			<div className='button-sm-1 mx-1 text-sm p-2'onClick={()=>setToggle(prev=> !prev)}> My Course List</div> 
			</div>
			{toggle ? 
            <div>
				{learn.length ? 
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
										{learn.map((ele, i)=>{
											return(
												<tr keu={i} className="whitespace-nowrap">
												<td className="px-6 py-4 text-sm text-gray-500">
												{ele.courseName}
												</td>
												<td className="px-6 py-4">
													<div className="text-sm text-gray-900">
													{ele.technology}
													</div>
												</td>
												<td className="px-6 py-4">
													<div className="text-sm text-gray-500">    {ele.duration}</div>
												</td>
												<td className="px-6 py-4 text-sm text-gray-500">
												{ele.approvedStatus && "Approved"}
												{ele.started && "On Going"}
												{ele.delayed && "Delayed"}
												</td>
												<td className="px-6 py-4 text-sm">
												{moment(ele.requestedDate).utc().format('DD-MM-YYYY')}   
												</td>
											</tr>
											)
										})}	
									</tbody>
								</table>
							</div> : ""}
        
                    <div className="container mx-auto mainForm  mb-4">
			<div className="flex justify-center px-6 mb-7">
			
				<div className="w-full  flex bg-neutral-300">
					
					<div className="w-10/12 p-1 rounded-lg lg:rounded-l-none mb-4 mt-3 mx-auto">
					<h6 className='text-center font-semibold mt-4 mb-3'>Request Learning</h6>
						<form onSubmit={formik.handleSubmit} className="px-2 pt-1 pb-4 mb-2" >
							<div className="mb-4 md:flex md:justify-between">
							<div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
										Course Name
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										id="courseName"
										type="text"
										name="courseName"
										onChange={formik.handleChange}
										value={formik.values.courseName}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.courseName && formik.errors.courseName ? <small className='error'> {formik.errors.courseName} </small> : null}
								</div>
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
										Course Type 
									</label>
									<select name="courseType"
									className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline" 
									id="courseType"
									onChange={formik.handleChange}
									value={formik.values.courseType}
									onBlur={formik.handleBlur}>
										<option defaultValue >Select:</option>
											<option  value="Online">Online</option>
											<option value="Offline">Offline</option>
											</select>
											{formik.touched.courseType && formik.errors.courseType ? <small className='error'> {formik.errors.courseType} </small> : null}
								</div>
                                {/* <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
										Approver
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										
										type="text"
										name="approver"
										onChange={formik.handleChange}
										value={formik.values.approver}
									/>
								</div> */}
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
										onChange={formik.handleChange}
										value={formik.values.comments}
                                        rows="3" cols="35"
									></textarea>
									 {formik.touched.comments && formik.errors.comments ? <small className='error'> {formik.errors.comments} </small> : null}
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
			: <div className='flex justify-center mt-3 mb-5 '>
				{learn.map((ele, i)=>{
					return (
						<div key={i} className='videoCard'>
							<YouTube videoId={ele.videoID} onError={5}  title={ele.courseName}  opts={opts} onReady={onReady} />
						<h5 className='courseName'>{ele.courseName}</h5>
						</div>
					)
				})}
				
				 </div> }
            
        </div>
        <NavBar  />
        </>
    )
}

export default Learnings
