import React,  {useEffect, useState} from 'react';
import Navbar from "../../components/NavBar/NavBar";
import "./styles.css"
import { useFormik } from 'formik';
import {Person} from '@mui/icons-material';
import {BsFillTelephoneFill, BsFillCloudUploadFill} from "react-icons/bs"
import {MdLocationPin, MdEmail} from "react-icons/md"
import {AiFillEdit,} from "react-icons/ai"
import {fetchEmployeeData,  saveProfile} from "../../api/api"
import { useParams, useNavigate, Link} from "react-router-dom"
import {Alert} from "@mui/material"
import Swal from "sweetalert2"
import {useDispatch}  from "react-redux"
function Profile() {
  const {id} = useParams()
  const navigate = useNavigate()
  const  [toggle1, setToggle1] = useState(true)
  const [data, setData] = useState({})
  const [err, setErr] = useState(null)
  useEffect(()=>{
    fetchEmployeeData(id).then((res)=> setData(res.data))
    .catch(err=> setErr(err.message))
  }, [ navigate])

  const handleSubmit = (values)=>{
    console.log(values)
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        let form = {...values, userID:data.userID}
        saveProfile(form).then((res)=>{
          Swal.fire('Saved!', '', 'success')
        }).catch(err => Swal.fire('Error Changing data', '', 'info'))
       
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }
   
 
  const formik1 = useFormik({
		initialValues:{
			houseNo:"",
			houseName:"",
			zipCode:"",
			country:"",
			state:"",
			city:"",
			street:"",
			
			panNo:"",
			aadhaarNo:"",
			pfNo:"",
			esiNo:"",
			accountNumber:"",
			bank:"",
			
			PrimaryPhone:"",
			SecondaryPhone:"",
			
			degree:"",
			passoutYear:"",
			board:"",
			degree1:"",
			passoutYear1:"",
			board1:"",
		},
    onSubmit: (values, {resetForm})=> {
      console.log(values)
      handleSubmit(values)
      resetForm()

},
validate: values=>{
let error={}  
if(!values.houseNo) {
      error.houseNo="*Required"
}
if(!values.houseName ) {
  error.houseName="*Required"
}
if(!values.zipCode) {
      error.zipCode="*Required"
}
if(!values.country) {
      error.country="*Required"
}
if(!values.state) {
      error.state="*Required"
}
if(!values.city) {
      error.city="*Required"
}
if(!values.street) {
      error.street="*Required"
}
if(!values.panNo) {
  error.panNo="*Required"
}
if(!values.aadhaarNo) {
  error.aadhaarNo="*Required"
}
if(!values.pfNo) {
  error.pfNo="*Required"
}
if(!values.esiNo) {
  error.esiNo="*Required"
}
if(!values.accountNumber) {
  error.accountNumber="*Required"
}
if(!values.bank) {
  error.bank="*Required"
}
if(!values.PrimaryPhone) {
  error.PrimaryPhone="*Required"
}
if(!values.SecondaryPhone) {
  error.SecondaryPhone="*Required"
}
return error
}
  })

  return (
  <>
  <div className="viewPay">
    <div className='sm:mt-5 mb-5 containermain'>
    { err &&  <div className='flex justify-center'> <Alert severity='warning' >{err}</Alert> </div> }
    
    <div className='flex float-left mr-auto sm:mt-3  pl-4'>  
      <Link to="/view-employees" className="button-sm-1" >Back</Link>
        </div>
    <div className='flex float-right ml-auto pr-4 sm:mt-3'>  
        <div className='flex button-sm-1 mb-2' onClick={()=>{navigate(`/edit-employees/${data.userID}`)} }>  <AiFillEdit/> <small>Edit</small> </div>
        
        </div>
        <form onSubmit={formik1.handleSubmit}>
      <div className='profileMain'>
        {/* Profile picture and basic detiails */}
      <div className=' w-16 md:w-32 lg:w-48 card md:mt-4'>
        <div className='flex flex-col mx-auto items-center py-1'> 
        <Person  style={{ fontSize:'75px', color: "grey"}}/> 
        <div className='flex '>
          <label htmlFor="file-upload" className="custom-file-upload">
           <BsFillCloudUploadFill /> <small>Upload Photo</small> 
            </label>
          </div>
        </div>
        <div className='flex flex-col justify-center align-center mx-auto profileView'>
         
      
      <input id="file-upload" type="file" />
      <h5 className='font-bold mt-2'>{data.fullname} </h5>
      <p className='font-semibold'> {data.empID}</p>
      <p className='font-semibold text-red-500'>{data?.Designation?.name}</p>
      <div className='font-semibold flex items-center iconSec my-1'> <MdLocationPin color="red" size="22px"/> <p className="ml-2"> {data?.jobLocation} </p></div>
        <div className='font-semibold flex items-center iconSec my-1'> <BsFillTelephoneFill color="grey"size="20px" /> <p className="ml-2"> {data?.contactInformation?.PrimaryPhone} </p></div>
        <div className='font-semibold flex items-center iconSec my-1'> <MdEmail color="#2072bb" size="20px" /> <p className="ml-2 text-cyan-400"> {data?.organisationEmail} </p></div>
        </div>
        </div>
           {/* End Profile picture */}

              {/* Contact Details */}
        <div className=' w-16 md:w-32 lg:w-48 card border-r-1 border-zinc-400'>
        <h5 className='font-bold text-center pt-3'> Contact Information</h5>
        <h6 className='font-bold ms-3 text-base'> Permanent  Address</h6>
          <div className='flex justify-start ms-3'>
             </div>
             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-normal text-sm text-left'>  House No</p> 
            </div>
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.address?.houseNo}</p> 
            </div>
            
             </div>

             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-normal text-sm text-left'>  House Name</p> 
            </div>
          
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.address?.houseName}</p> 
            </div>
        
             </div>

             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-normal text-sm text-left'>  Street</p> 
            </div>
            
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.address?.street}</p> 
            </div>
             </div>

             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-normal text-sm text-left'>  City</p> 
            </div>
          
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.address?.city}</p> 
            </div>
             </div>

             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-normal text-sm text-left'>  Zip</p> 
            </div>
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.address?.zipCode}</p> 
            </div>
             </div>
             {/* Contact Details */}
             <h5 className='font-semibold text-base ms-3'> Contact Details</h5>
             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-normal text-sm text-left'>  Primary Contact No</p> 
            </div>
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.contactInformation?.PrimaryPhone}</p> 
            </div>
             </div>
    

             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-normal text-sm text-left'>  Secondary Contact No</p> 
            </div>
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.contactInformation?.SecondaryPhone}</p> 
            </div>

             </div>

             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-normal text-sm text-left'>Perosnal Email</p> 
            </div>
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.email}</p> 
            </div>
             </div>
          
        
        
        </div>
      </div>
      {/* next card */}
      <div className='profileMain '>
        {(data.accomplishments || data.contributions) &&
      <div className=' w-16 md:w-32 lg:w-48 card border-r-1 border-zinc-400'>
        <h5 className='font-bold text-center text-base'> Achievements</h5>
        <h6 className='font-bold ms-3 text-base'> Contributions</h6>
          <div className='flex flex-col justify-start ms-3'>
         
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm text-left'>Title </p> 
            </div>
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm text-left'>Descriptions </p> 
            </div>
             </div>
             <div className='flex flex-col justify-start ms-3'>     
             </div>
             <h6 className='font-bold ms-3 text-base'> Accomplishments</h6>
             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-semibold text-sm text-left'>  Title.</p> 
            </div>
             </div>

             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-semibold text-sm text-left'> Descriptions</p> 
            </div>
             </div>
        </div>  }
        <div className=' w-16 md:w-32 lg:w-48 card border-r-1 border-zinc-400'>
        <h6 className='font-bold ms-3 text-base'> Other Statutary Information</h6>
          <div className='flex justify-start ms-3'>
            <div className='flex  mx-3 w-2/5'>
            <p className='font-normal text-sm text-left'>PAN No.</p> 
            </div>
     
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.otherStatutoryInfo?.panNo}</p> 
            </div>
        
             </div>
             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-normal text-sm text-left'>  Aadhar No</p> 
            </div>
            
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.otherStatutoryInfo?.aadhaarNo}</p> 
            </div>
        
             </div>

             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-normal text-sm text-left'>  PF No.</p> 
            </div>
        
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.otherStatutoryInfo?.pfNo}</p> 
            </div>

             </div>

             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-normal text-sm text-left'>  ESCI No</p> 
            </div>
            
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.otherStatutoryInfo?.esiNo}</p> 
            </div>
           
             </div>
             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-normal text-sm text-left'>  Account No</p> 
            </div>
           
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.bankDetails?.accountNumber}</p> 
            </div>
            
             </div>
             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-normal text-sm text-left'>  Bank</p> 
            </div>
           
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.bankDetails?.bank}</p> 
            </div>
            
             </div>

        </div>
      </div>
      {/* next card */}
      <div className=' w-16 md:w-32 lg:w-48 cardBottom'>
        
        <div className='my-2 flex flex-col'>
        <h6 className='font-bold ms-3 text-base'> Educational Details</h6>
      <div className='flex justify-start ms-3'>  

             <div className='flex mx-3 w-2/5 '>
            <p className='font-normal text-sm text-left'>  10th Grade</p> 
            </div>
           
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'> {data?.education2?.degree2} </p> 
            </div>
          
            <div className='flex mx-3 w-2/5 '>
            <p className='font-normal text-sm text-left'>  Passout Year</p> 
            </div>
           
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'> {data?.education2?.passoutYear2} </p> 
            </div>
            

            <div className='flex mx-3 w-2/5 '>
            <p className='font-normal text-sm text-left'>  Board</p> 
            </div>
          
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'> {data?.education2?.board2} </p> 
            </div>
      
             </div>
             </div>

             <div className='my-2 flex flex-col'>
         
          <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-normal text-sm text-left'>  Higher Education</p> 
            </div>
           
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'> {data?.education?.degree} </p> 
            </div>
            
            <div className='flex mx-3 w-2/5 '>
            <p className='font-normal text-sm text-left'>  Passout Year</p> 
            </div>
            
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'> {data?.education?.passoutYear} </p> 
            </div>
            
            <div className='flex mx-3 w-2/5 '>
            <p className='font-normal text-sm text-left'>  Board </p> 
            </div>
         
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'> {data?.education?.board} </p> 
            </div>
            
             </div>
             </div>
             {!toggle1 &&<div className='flex justify-end my-2'>  <button  type="submit"  className=' button-sm-1'> Save</button> </div>} 
      </div>
     
      </form>
    </div>
  </div>  
  <Navbar />
  </>);
}

export default Profile;
