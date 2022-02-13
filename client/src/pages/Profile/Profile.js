import React,  {useState} from 'react';
import Navbar from "../../components/NavBar/NavBar";
import "./styles.css"
import { useFormik } from 'formik';
import {Person } from '@mui/icons-material';
import {BsFillTelephoneFill} from "react-icons/bs"
import {MdLocationPin, MdEmail} from "react-icons/md"
import {AiFillEdit, AiOutlineClose} from "react-icons/ai"
import { useSelector, useDispatch } from 'react-redux';
import Swal from "sweetalert2"
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {fetchProfile} from "../../redux/employee/employeeSlice"
import {submitAddress, submitPersonalInfo} from "../../api/employee"
import {Cloudinary} from "@cloudinary/url-gen";
import Avatar from '@mui/material/Avatar';
// Import required actions.
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {sepia} from "@cloudinary/url-gen/actions/effect";
import PopUp from "./PopUp"
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";

function Profile() {
 
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'stormiscoming'
    }
  }); 

  const myImage = cld.image('EmployeeProfilEPic');
  myImage
  .resize(thumbnail().width(150).height(150).gravity(focusOn(FocusOn.face())))  // Crop the image.
  .roundCorners(byRadius(50))    // Round the corners.
  .effect(sepia())  // Apply a sepia effect.
  .format('jpeg');   // Deliver as PNG. */
  const {data} = useSelector(state=> state.employee)
  const  [toggle1, setToggle1] = useState(true)
  const [toggle2, setToggle2] = useState(true)
  const [address, setAddress] = useState({})
  const [success, setSuccess] = useState(null)


	const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
		  return;
		}
		setOpen(false);
	  };
  const dispatch = useDispatch()
  const handleChange =(e)=> setAddress({ ...address, [e.target.name]: e.target.value });
  const handleSubmit1 = (e)=>{
    e.preventDefault()

    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        let form = {address, userID:data.userID}
        submitAddress(form).then((res)=>{
          dispatch(fetchProfile(res.data))
          setSuccess("Success Updated")
          Swal.fire('Saved!', '', 'success')
        }).catch(err => Swal.fire('Error Changing data', '', 'info'))
       
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  const handleSubmit2 = (values)=>{
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        let form = {data:values, userID:data.userID}
        submitPersonalInfo(form).then((res)=>{
          setToggle2(true)
          setSuccess("Success Updated")
          dispatch(fetchProfile(res.data))
          Swal.fire('Saved!', '', 'success')
        }).catch(err => Swal.fire('Error Changing data', '', 'info'))
       
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }



  const formik2 = useFormik({
		initialValues:{
			fatherName:"",
			motherName:"",
			BloodGroup:"",
			contactPerson:"",
			phoneNumber:"",
			place:"",

		},
    onSubmit: (values, {resetForm})=> {
      handleSubmit2(values)
      resetForm()

},
validate: values=>{
let error={}  
if(!values.fatherName) {
      error.fatherName="*Required"
}
if(!values.motherName) {
      error.motherName="*Required"
}
if(!values.BloodGroup) {
      error.BloodGroup="*Required"
}
if(!values.contactPerson) {
      error.contactPerson="*Required"
}
if(!values.phoneNumber) {
      error.phoneNumber="*Required"
}
if(!values.phoneNumber) {
      error.phoneNumber="*Required"
}
if(!values.place) {
      error.place="*Required"
}
return error
}
  })
  return (
  <>
  <div className="viewPay">
    <div className=' sm:mt-5 mb-5'>
     
      <div className='profileMain'>
        
        {/* Profile picture and basic detiails */}
      <div className=' w-16 md:w-32 lg:w-48 card md:mt-4'>
        <div className='flex justify-center py-1'> 
        
        {data?.selectedFile ? <Avatar sx={{ width: 150, height: 150 }}  src={data?.selectedFile} alt="profile-face" /> 
       : <Person  style={{ fontSize:'75px', color: "grey"}}/> }

        </div>
        <div className='flex flex-col justify-center align-center mx-auto profileView'>
      <div className='flex mx-auto items-center py-1 justify-evenly'>
      {data?.selectedFile ? <PopUp popName={" Change Photo"} publicID={data?.filePublicID} status={true} /> : <PopUp  popName={"Upload new Photo"} status={false}  publicID={""} /> }
      </div>
   
      <h5 className='font-bold mt-2'>{data?.fullname} </h5>
      <p className='font-semibold'> {data?.empID} </p>
      <p className='font-semibold text-red-500'>{data?.Designation?.name}</p>
      <div className='font-semibold flex items-center iconSec my-1'> <MdLocationPin color="red" size="22px"/> <p className="ml-2"> {data?.jobLocation} </p></div>
        <div className='font-semibold flex items-center iconSec my-1'> <BsFillTelephoneFill color="grey"size="20px" /> <p className="ml-2"> {data?.contactInformation?.PrimaryPhone} </p></div>
        <div className='font-semibold flex items-center iconSec my-1'> <MdEmail color="#2072bb" size="20px" /> <p style={{color:"#7dd3fc"}} className="ml-2"> {data?.organisationEmail} </p></div>
        </div>
        </div>
           {/* End Profile picture */}

              {/* Contact Details */}
        <div className=' w-16 md:w-32 lg:w-48 card border-r-1 border-zinc-400'>
        <h5 className='font-bold ms-3 pt-3'> Contact Information</h5>
        <h6 className='font-bold ms-3 text-base'> Permanent Address</h6>
             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-thin text-sm text-left'>  House No</p> 
            </div>
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.address?.houseNo}</p> 
            </div>
             </div>

             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-thin text-sm text-left'>  House Name</p> 
            </div>
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.address?.houseName}</p> 
            </div>
             </div>

             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-thin text-sm text-left'>  Street</p> 
            </div>
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.address?.street} </p> 
            </div>
             </div>

             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-thin text-sm text-left'>  City</p> 
            </div>
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.address?.city} </p> 
            </div>
             </div>
             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-thin text-sm text-left'>  State</p> 
            </div>
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.address?.state} </p> 
            </div>
             </div>

             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-thin text-sm text-left'>  Zip</p> 
            </div>
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.address?.zipCode} </p> 
            </div>
             </div>
             {/* Contact Details */}
             <h5 className='font-semibold text-base ms-3'> Contact Details</h5>
             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-thin text-sm text-left'>  Primary Contact No</p> 
            </div>
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.contactInformation?.PrimaryPhone} </p> 
            </div>
             </div>

             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-thin text-sm text-left'>  Secondary Contact No</p> 
            </div>
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.contactInformation?.SecondaryPhone} </p> 
            </div>
             </div>

             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-thin text-sm text-left'>Perosnal email</p> 
            </div>
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>{data?.contactInformation?.SecondaryEmail} </p> 
            </div>
             </div>
          
        
        
        </div>
      </div>
      {/* next card */}
      <div className='profileMain '>
      <div className=' w-16 md:w-32 lg:w-48 card '>
      <div className='flex ml-auto'>  
      {toggle1 ? 
        <div className='flex items-center button-sm-1 mb-2 ' onClick={()=> setToggle1(p=> !p)}>  <AiFillEdit/> <small>Edit</small> </div>
        : <div className='flex items-center cursor-pointer mb-2 border rounded'
         onClick={()=> setToggle1(p=> !p)}>  <AiOutlineClose/><small>Close</small>   </div>}
        </div>
       
        <h6 className='font-bold ms-3 text-base'> Present Address</h6>
        <form > 

          <div className='flex justify-start ms-3'>
            <div className='flex  mx-3 w-2/5'>
            <p className='font-thin text-sm text-left'>  House Name</p> 
            </div>
            {toggle1 ? 
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.address2?.houseName}</p> 
            </div>
            : 		<input
            className=" w-2/5 px-2 text-sm my-1 leading-tight  bg-neutral-300 border-1 border-neutral-300 rounded  focus:outline-none focus:shadow-outline"
            type="text"
            name="houseName"
            onChange={handleChange}
          />}
             </div>
             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-thin text-sm text-left'>  House No</p> 
            </div>
            {toggle1 ? 
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'> {data?.address2?.houseNo}</p> 
            </div>
            : 		<input
            className=" w-2/5 text-sm px-2 my-1 leading-tight  bg-neutral-300 border-1 border-neutral-300 rounded  focus:outline-none focus:shadow-outline"
            type="text"
            name="houseNo"
            onChange={handleChange}
            
          />}
             </div>

             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-thin text-sm text-left'>  Street</p> 
            </div>
            {toggle1 ? 
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'> {data?.address2?.street} </p> 
            </div>
            : 		<input
            className=" w-2/5 text-sm px-2 my-1 leading-tight  bg-neutral-300 border-1 border-neutral-300 rounded  focus:outline-none focus:shadow-outline"
            type="text"
            name="street"
            onChange={handleChange}
          />}
             </div>

             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-thin text-sm text-left'>  City</p> 
            </div>
            {toggle1 ? 
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'> {data?.address2?.city} </p> 
            </div>
            : 		<input
            className=" w-2/5 text-sm px-2 my-1 leading-tight  bg-neutral-300 border-1 border-neutral-300 rounded  focus:outline-none focus:shadow-outline"
            type="text"
            name="city"
            onChange={handleChange}
          
          />}
             </div>
             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-thin text-sm text-left'>  State</p> 
            </div>
            {toggle1 ? 
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'> {data?.address2?.state} </p> 
            </div>
            : 		<input
            className=" w-2/5 text-sm px-2 my-1 leading-tight  bg-neutral-300 border-1 border-neutral-300 rounded  focus:outline-none focus:shadow-outline"
            type="text"
            name="state"
            onChange={handleChange}

          />}
             </div>
             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-thin text-sm text-left'>  Zip</p> 
            </div>
            {toggle1 ? 
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'> {data?.address2?.zipCode} </p> 
            </div>
            : 		<input
            className=" w-2/5 text-sm px-2 my-1 leading-tight  bg-neutral-300 border-1 border-neutral-300 rounded  focus:outline-none focus:shadow-outline"
            type="number"
            maxLength={6}
            name="zipCode"
            onChange={handleChange}

          />}
             </div>
             {!toggle1 &&<div className='flex justify-end my-2'> 
              <button onClick={handleSubmit1} type="submit" className=' button-sm-1'> Save</button> </div>} 
             </form>
        </div>
        <div className=' w-16 md:w-32 lg:w-48 card border-r-1 border-zinc-400'>
        <h6 className='font-bold ms-3 text-base'> Other Statutary Information</h6>
          <div className='flex justify-start ms-3'>
            <div className='flex  mx-3 w-2/5'>
            <p className='font-thin text-sm text-left'>PAN No.</p> 
            </div>
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.otherStatutoryInfo?.panNo} </p> 
            </div>
             </div>
             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-thin text-sm text-left'>  Aadhar No</p> 
            </div>
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.otherStatutoryInfo?.aadhaarNo} </p> 
            </div>
           
             </div>
              <div className='flex justify-start ms-3'>
              <div className='flex  mx-3 w-2/5'>
                 <p className='font-thin  text-sm text-lef'>  UAN NO </p> 
                 </div>
                  <div className='flex  mx-3 w-2/5'>
                  <p className='font-semibold text-sm'>  {data?.otherStatutoryInfo?.uanNo} </p> 
                  </div>
              </div>

             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-thin text-sm text-left'>  PF No.</p> 
            </div>
            
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>  {data?.otherStatutoryInfo?.pfNo} </p> 
            </div>
             </div>

             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-thin text-sm text-left'>  ESCI No</p> 
            </div>
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'> {data?.otherStatutoryInfo?.esiNo} </p> 
            </div>
             </div>
             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-thin text-sm text-left'>  Account No</p> 
            </div>
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>   {data?.bankDetails?.accountNumber} </p> 
            </div>
             </div>
             <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-thin text-sm text-left'>  Bank</p> 
            </div>
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'>   {data?.bankDetails?.bank} </p> 
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
      </div>
      <div className=' w-16 md:w-32 lg:w-48 cardBottom'>
        <form onSubmit={formik2.handleSubmit}>
        <div className='my-2 flex flex-col'>
        <div className='flex ml-auto'>  
        {toggle2 ?
        <div className='flex items-center button-sm-1 pr-5' onClick={()=>{setToggle2(p=> !p)}}>  <AiFillEdit/> <small>Edit</small> </div>
        : <div className='flex items-center bg-red-500 cursor-pointer mb-2 border rounded' onClick={()=> setToggle2(p=> !p)}>  <AiOutlineClose/><small>Close</small> </div>}
        </div>
      

      <h6 className='font-bold ms-3 text-base'> Personal Details</h6>
      <div className='flex justify-start ms-3'>  
 
             <div className='flex mx-3 w-2/5 '>
            <p className='font-thin text-sm text-left'>  Father's Name</p> 
            </div>
            {toggle2 ? 
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'> {data?.personalDetails?.fatherName} </p> 
            </div>
            : 	<input
            className="w-2/4 text-sm px-2 my-1 leading-tight  bg-neutral-300 border-1 border-neutral-300 rounded  focus:outline-none focus:shadow-outline"
            type="text"
            name="fatherName"
            onChange={formik2.handleChange}
            value={formik2.values.fatherName}
            onBlur={formik2.handleBlur}
          />}
          {!toggle2 && (formik2.touched.fatherName && formik2.errors.fatherName ? <small className='error'> {formik2.errors.fatherName} </small> : null ) }
            <div className='flex mx-3 w-2/5 '>
            <p className='font-thin text-sm text-left'>  Mother's Name</p> 
            </div>
            {toggle2 ? 
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'> {data?.personalDetails?.motherName} </p> 
            </div>
            : 		<input
            className="w-2/4 text-sm px-2 my-1 leading-tight  bg-neutral-300 border-1 border-neutral-300 rounded  focus:outline-none focus:shadow-outline"
            type="text"
            name="motherName"
            onChange={formik2.handleChange}
            value={formik2.values.motherName}
            onBlur={formik2.handleBlur}
          />}    
           {!toggle2 && (formik2.touched.motherName && formik2.errors.motherName ? <small className='error'> {formik2.errors.motherName} </small> : null)}

            <div className='flex mx-3 w-2/5 '>
            <p className='font-thin text-sm text-left'>  Blood Group</p> 
            </div>
            {toggle2 ? 
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'> {data?.personalDetails?.BloodGroup} </p> 
            </div>
            : 		<input
            className="w-2/4 text-sm px-2 my-1 leading-tight  bg-neutral-300 border-1 border-neutral-300 rounded  focus:outline-none focus:shadow-outline"
            type="text"
            name="BloodGroup"
            onChange={formik2.handleChange}
            value={formik2.values.BloodGroup}
            onBlur={formik2.handleBlur}
          />}
          {!toggle2 && (formik2.touched.BloodGroup && formik2.errors.BloodGroup ? <small className='error'> {formik2.errors.BloodGroup} </small> : null)}
             </div>
             </div>
     
             <div className='my-2 flex flex-col'>
          <h6 className='font-bold ms-3 text-base'> Emergency Contact</h6>
          <div className='flex justify-start ms-3'>     
             <div className='flex mx-3 w-2/5 '>
            <p className='font-thin text-sm text-left'> Contact Person</p> 
            </div>
            {toggle2 ? 
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'> {data?.emergencyContact?.contactPerson} </p> 
            </div>
            : 		<input
            className="w-2/4 text-sm px-2 my-1 leading-tight  bg-neutral-300 border-1 border-neutral-300 rounded  focus:outline-none focus:shadow-outline"
            type="text"
            name="contactPerson"
            onChange={formik2.handleChange}
            value={formik2.values.contactPerson}
            onBlur={formik2.handleBlur}
          />}
           {!toggle2 && (formik2.touched.contactPerson && formik2.errors.contactPerson ? <small className='error'> {formik2.errors.contactPerson} </small> : null)} 
            <div className='flex mx-3 w-2/5 '>
            <p className='font-thin text-sm text-left'>  Phone Number</p> 
            </div>
            {toggle2 ? 
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'> {data?.emergencyContact?.phoneNumber} </p> 
            </div>
            : 		<input
            className="w-2/4 text-sm px-2 my-1 leading-tight  bg-neutral-300 border-1 border-neutral-300 rounded  focus:outline-none focus:shadow-outline"
            type="text"
            name="phoneNumber"
            onChange={formik2.handleChange}
            value={formik2.values.phoneNumber}
            onBlur={formik2.handleBlur}
          />}
       {!toggle2 && (formik2.touched.phoneNumber && formik2.errors.phoneNumber ? <small className='error'> {formik2.errors.phoneNumber} </small> : null)} 
            <div className='flex mx-3 w-2/5 '>
            <p className='font-thin text-sm text-left'>  Place</p> 
            </div>
            {toggle2 ? 
            <div className='flex  mx-3 w-2/5'>
            <p className='font-semibold text-sm'> {data?.emergencyContact?.place} </p> 
            </div>
            : 		<input
            className="w-2/4 text-sm px-2 my-1 leading-tight  bg-neutral-300 border-1 border-neutral-300 rounded  focus:outline-none focus:shadow-outline"
            type="text"
            name="place"
            onChange={formik2.handleChange}
            value={formik2.values.place}
            onBlur={formik2.handleBlur}
          /> 
          }
          {!toggle2 && (formik2.touched.place && formik2.errors.place ? <small className='error'> {formik2.errors.place} </small> : null)} 
             </div>
             </div>
             {!toggle2 &&<div className='flex justify-end my-2'>  <button type="submit" className=' button-sm-1'> Save</button> </div>} 
             </form>
      </div>
    </div>
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
												<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
												{success}
												</Alert>
											</Snackbar>
  </div>  
  <Navbar />
  </>);
}

export default Profile;
