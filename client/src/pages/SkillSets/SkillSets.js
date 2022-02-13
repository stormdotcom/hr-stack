import React,{useRef, useState, useEffect} from 'react'
import NavBar from '../../components/NavBar/NavBar'
import "./styles.css"
import {RiUpload2Fill} from "react-icons/ri"
import { useFormik } from 'formik';
import {useSelector} from "react-redux"
import Swal from "sweetalert2"
import {submitSkills, getMyskills} from "../../api/employee"
import {CircularProgress} from "@mui/material"
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Axios from "axios"
import * as yup from "yup";
import {useNavigate} from "react-router-dom"
function SkillSets() {
	const navigate = useNavigate()
	const {data} = useSelector(state=> state.employee)
	const [img, setimg] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(null)
	const [preview, setPreview] = useState()
	const [open, setOpen] = useState(false);
	const [mySkills, setMyskills] = useState(null)
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
		  return;
		}
		setOpen(false);
	  };
	useEffect(() => {
		getMyskills(data.userID).then((res)=>{
			setMyskills(res.data)
		}).catch(err=> console.log(err.message))
        if (!img) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(img)
        setPreview(objectUrl)
        return () => {
			setMyskills(null)
			URL.revokeObjectURL(objectUrl)}

    }, [img, navigate, data.userID])
	const handleImage =(e)=>{
		let file = e.target.files
		if (!file || file.length === 0) {
            setimg(undefined)
            return
        }

		if(file[0].type === "image/jpeg" || file[0].type === "image/jpg" || file[0].type === "image/png"){
			setimg(e.target.files[0])
			setError(null)
		}
		else {
			setError("Unsupported file format \n please upload [jpeg, jpg, png] format")
			setimg(undefined)
		}
	
	  }

	const handleSubmit = async (values)=>{
		setLoading(true)
		try {
			const formData = new FormData();
			formData.append("api_key",'249459347837371');
			formData.append("file", img);
			formData.append("public_id", "skills/"+values.technology+"_"+data.fullname);
			formData.append("upload_preset", "hrstackMedia");
			const result = 	await Axios.post('https://api.cloudinary.com/v1_1/stormiscoming/image/upload/', formData)
			setOpen(true);
			setSuccess("Uploaded Successfully")
			const {secure_url } = result.data
			let {fullname, userID, empID, projectAllocated} = data
			let { Project:project} = projectAllocated
			let form = { selectedFile:secure_url,project,fullname, userID, empID, ...values}
			submitSkills(form).then((res)=> {
				setLoading(false)
				setimg(null)
				Swal.fire({
					title: 'Success!',
					text: 'Skill updation Submitted',
					icon: 'success',
				  })
			}).catch((err)=>{
				Swal.fire({
					title: 'Uh oh!',
					text: 'Skill updation failed',
					icon: 'info',
				  })
			})
		}
		catch (err){
			setError("Failed uploading image")
		}


	}
	const schema = yup.object({
		selfRating: yup
		  .number()
		  .required('Required a number')
		  .min(1, 'Minimal value 1')
          .max(10, 'Maximum value 10') 
	  });
	const formik = useFormik({
		initialValues:{
			technology:"",
			category:"",
			selfRating:"",
			experience:"",
			type:"",

		},
		onSubmit: (values, {resetForm})=> {
		  handleSubmit(values)
		  resetForm()
		},
		validationSchema:(schema),
		validate: values=>{
		  let error={}
		  if(!values.experience) {
			error.experience="*Required"
		  }
		  if(!values.type) {
			error.type="*Required"
		  }
		  if(!values.category) {
			error.category="*Required"
		  }
		  
		  return error
		}
	})
    const inputFile = useRef(null) 
const handleClick = ()=>{
    inputFile.current.click();
}    
return (
        <>
        <div className='viewPay'>
            <div className='assetRequest'>
		{mySkills &&    <div className="container my-5 tableView py-4 raiseIssueTable">
            <h6 className='text-center font-semibold'>Skill List</h6>
                        <table className="table-auto border-collapse  w-100 text-center ">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Category
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Experience in Months
                                    </th>

                                    <th className="px-4 py-2 text-xs text-gray-500 ">
									 Rating  <small>(out of 10)</small>
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Technology
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white border border-gray-400">
								{mySkills.map((ele, i)=>{
									return (
										<tr key={i} className="whitespace-nowrap">
										<td className="px-6 py-4 text-sm text-gray-500">
										{ele.category}
										</td>   
										<td className="px-6 py-4 text-sm text-gray-500">
									   	{ele.experience} months
										</td>
										<td className="px-6 py-4 text-sm">
										{ele.selfRating}
										</td>
										<td className="px-6 py-4 text-sm">
										{ele.technology}
										</td>
									</tr>
									)
								})}
              
                            </tbody>
                        </table>
                    </div>}
     
                    <div className="container mx-auto mainForm">
			<div className="flex justify-center px-6 my-12">
			
				<div className="w-full  flex">
					
					<div className="w-full p-1 rounded-lg lg:rounded-l-none">
                    <h6 className='text-center font-semibold'>Add Skill</h6>
						<form onSubmit={formik.handleSubmit}className="px-2 pt-1 pb-4 mb-2">
							<div className="mb-4 md:flex md:justify-between">

							<div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
										Skill Type
									</label>
									<select id="type"
									className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										onChange={formik.handleChange}
										value={formik.values.type}
										onBlur={formik.handleBlur} 
											name="type">
										<option  value="">Select:</option>
										<option defaultValue value="Soft">Soft Type</option>
										<option value="Hard">Hard Type</option></select>
									{formik.touched.type && formik.errors.type ? <small className='error'> {formik.errors.type} </small> : null}
								</div>

								{formik.values.type === "Hard" && 
									<div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
										Technology
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										id="technology"
										type="text"
										name="technology"
										onChange={formik.handleChange}
										value={formik.values.technology}
										onBlur={formik.handleBlur}
									/>
							{formik.touched.technology && formik.errors.technology ? <small className='error'> {formik.errors.technology} </small> : null}
								</div>}                        
						
                                <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
                                    Self Rating <small>(out of 10)</small>
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										type="number"
										pattern='[0-9'
										name="selfRating"
										onChange={formik.handleChange}
										value={formik.values.selfRating}
										onBlur={formik.handleBlur}
									/>
										{formik.touched.selfRating && formik.errors.selfRating ? <small className='error'> {formik.errors.selfRating} </small> : null}
								</div>
             						
							</div>

                            <div className="mb-4 md:flex md:justify-between">
							{formik.values.type === "Hard" ?
								<div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
									Category
									</label>
							 <select id="domain"
									className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										onChange={formik.handleChange}
										value={formik.values.category}
										onBlur={formik.handleBlur} 
											name="category">
										<option  value="">Select:</option>
										<option defaultValue value="Web Development">Web Development</option>
										<option value="UX-UI">UX-UI</option>
										<option value="CyberSec">CyberSec</option>
										<option value="Mobile App Develeopment">Mobile App Develeopment</option>
										<option value="Data Science">Data Science</option>
										<option value="Block Chain">Block Chain</option>
										<option value="Machine Learning">Machine Learning</option>
										<option value="Networking">Networking</option>
										<option value="Others">Others</option>
										</select>
						
									{formik.touched.category && formik.errors.category ? <small className='error'> {formik.errors.category} </small> : null}
								</div>
									:
									<div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
									Category
									</label>
							 <select id="domain"
									className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										onChange={formik.handleChange}
										value={formik.values.category}
										onBlur={formik.handleBlur} 
											name="category">
										<option  value="">Select:</option>
										<option defaultValue value="Communication">Communication</option>
										<option value="Teamwork">Teamwork</option>
										<option value="Problem-solving">Problem-solving</option>
										<option value="Leadership">Leadership</option>
										<option value="Responsibility">Responsibilitye</option>
										<option value="Decisiveness">Decisiveness</option>
										</select>
						
									{formik.touched.category && formik.errors.category ? <small className='error'> {formik.errors.category} </small> : null}
								</div>	}
                                <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
                                    Experience in Months
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
			
										type="text"
										name="experience"
										onChange={formik.handleChange}
										value={formik.values.experience}
										onBlur={formik.handleBlur}
									/>
										{formik.touched.experience && formik.errors.experience ? <small className='error'> {formik.errors.experience} </small> : null}
								</div>	
								
								             
                            <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
										Upload Certificate <small>(if any certification)</small>
									</label>
									<div onClick={handleClick}
										className="w-full px-12 py-3 skillUpload"		
						        > 
								{img ? <img alt="uploaded-media" className='object-contain h-28 w-40' src={preview} /> :<RiUpload2Fill className='mx-auto text-4xl text-fourth' />  } 
                                
                                 <input
								 type='file' 
								 id='fileSelected' 
								 onChange={handleImage}
								 name="fileSelected" 
								 ref={inputFile} 
								 style={{display: 'none'}}/>
									
                                </div>
								{error && <small className='error'> {error} </small  > }
								</div>
							
							</div>
				
							<div className="mb-2 text-center flex justify-end ">
								<div className='flex space-x-4'> 
								{loading &&	<CircularProgress />}
									<button
										className="button-1"
										type="submit"
									>
										Submit
									</button>
								</div>

							</div>
						
						</form>
					</div>

                    
				</div>
			</div>
            
		</div>
        
            </div>
								  <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
												<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
												{success}
												</Alert>
											</Snackbar>
										
        </div>
         <NavBar />
         </>
    )
}

export default SkillSets
