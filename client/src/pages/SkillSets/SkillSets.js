import React,{useRef} from 'react'
import NavBar from '../../components/NavBar/NavBar'
import "./styles.css"
import {RiUpload2Fill} from "react-icons/ri"
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { useFormik } from 'formik';
function SkillSets() {
	const formik = useFormik({
		initialValues:{
			technology:"",
			projectName:"",
			category:"",
			selfRating:"",
			manager:"",
			approver:"",
			experience:""

		},
		onSubmit: (values)=> {
		  console.log(values)
	
		},
		validate: values=>{
		  let error={}
		  if(!values.technology) {
			error.technology="*Required"
		  }
		  if(!values.projectName) {
			error.projectName="*Required"
		  }
		  if(!values.category) {
			error.category="*Required"
		  }
		  if(!values.selfRating) {
			error.selfRating="*Required"
		  }
		  if(!values.manager) {
			error.manager="*Required"
		  }
		  if(!values.manager) {
			error.manager="*Required"
		  }
		  if(!values.approver) {
			error.approver="*Required"
		  }
		  if(!values.experience) {
			error.experience="*Required"
		  }
		  
		  return error
		}
	})
    const inputFile = useRef(null) 
    const cld = new Cloudinary({
        cloud: {
          cloudName: 'demo'
        }
         });
const myImage = cld.image('docs/models');
const handleClick = ()=>{
    inputFile.current.click();
}    
return (
        <>
        <div className='viewPay'>
            <div className='assetRequest'>

        <div className="container my-5 tableView py-4 raiseIssueTable">
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
                                        Skill
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Approved
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white border border-gray-400">
                                <tr className="whitespace-nowrap">
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                    Machine Learning
                                    </td>   
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                   6 Months
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                    NumPy
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        Approved
                                    </td>
                                </tr>
                        
    
                        
                            </tbody>
                        </table>
                    </div>
                    <div className="container mx-auto mainForm">
			<div className="flex justify-center px-6 my-12">
			
				<div className="w-full  flex">
					
					<div className="w-full p-1 rounded-lg lg:rounded-l-none">
                    <h6 className='text-center font-semibold'>Add Skill</h6>
						<form className="px-2 pt-1 pb-4 mb-2">
							<div className="mb-4 md:flex md:justify-between">
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
								</div>
                                <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
                                            Project Name
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										id="projectName"
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
										Category
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
										id="category"
										type="text"
										name="category"
										onChange={formik.handleChange}
										value={formik.values.category}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.category && formik.errors.category ? <small className='error'> {formik.errors.category} </small> : null}
								</div>
                                <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
                                    Self Rating
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
			
										type="text"
										name="selfRating"
										onChange={formik.handleChange}
										value={formik.values.selfRating}
										onBlur={formik.handleBlur}
									/>
										{formik.touched.selfRating && formik.errors.selfRating ? <small className='error'> {formik.errors.selfRating} </small> : null}
								</div>
             

							
							</div>

                            <div className="mb-4 md:flex md:justify-between">
                            <div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-medium text-gray-700" >
                                    Approver
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
			
										type="date"
										name="approver"
										onChange={formik.handleChange}
										value={formik.values.approver}
										onBlur={formik.handleBlur}
									/>
										{formik.touched.approver && formik.errors.approver ? <small className='error'> {formik.errors.approver} </small> : null}
								</div>
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
										Upload Certifacation <small>(if any certification)</small>
									</label>
									<div onClick={handleClick}
										className="w-full px-12 py-3 skillUpload"
										
						        > <RiUpload2Fill className='mx-auto text-4xl text-fourth' />  
                                
                                 <input type='file' id='file' ref={inputFile} style={{display: 'none'}}/>
                                </div>
								</div>
                         
              

							
							</div>
				
							<div className="mb-2 text-center flex justify-end">
								<button
									className="button-1"
									type="button"
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

export default SkillSets
