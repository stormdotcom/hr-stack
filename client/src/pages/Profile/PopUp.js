import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {BsFillCloudUploadFill} from "react-icons/bs"
import DialogTitle from '@mui/material/DialogTitle';
import { 
    extractImageFileExtensionFromBase64,
     } from "./CropHelper"
import Axios from "axios"
import Swal from "sweetalert2"
import { useSelector } from 'react-redux';
import { submitProfilePhoto} from "../../api/employee"
import {MdAddAPhoto} from "react-icons/md";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function PopUp({popName, status, publicID}) {

  const [open, setOpen] = React.useState(false);
  const [img, setimg] = React.useState({  imgSrc: null,imgSrcExt: null})
  const [error, setError] = React.useState(null)
  const [cropData, setCropData] = React.useState(null);
  const [cropper, setCropper] = React.useState();
 const {data} = useSelector(state=> state.employee)
 const imageMaxSize = 1000000000 // bytes
 const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
 const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})
 const verifyFile = (files) => {
    if (files && files.length > 0){
        const currentFile = files[0]
        const currentFileType = currentFile.type
        const currentFileSize = currentFile.size
        if(currentFileSize > imageMaxSize) {
            setError("This file is not allowed. " + currentFileSize + " bytes is too large")
            return false
        }
        if (!acceptedFileTypesArray.includes(currentFileType)){
            setError("This file is not allowed. Only images are allowed.")
            return false
        }
        return true
    }
}
const getCropData = () => {
  if (typeof cropper !== "undefined") {
    setCropData(cropper.getCroppedCanvas().toDataURL());
  }
};


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setimg({  imgSrc: null,imgSrcExt: null})
    setOpen(false);
    setError(null)
  };
  const handleImage =(e)=>{
    let files = e.target.files
    if (files && files.length > 0){
          const isVerified = verifyFile(files)
         if (isVerified){
             // imageBase64Data 
             const currentFile = files[0]
             const myFileItemReader = new FileReader()
             myFileItemReader.addEventListener("load", ()=>{
                 const myResult = myFileItemReader.result
            setimg({
                     imgSrc: myResult,
                     imgSrcExt: extractImageFileExtensionFromBase64(myResult)
                 })
             }, false)

             myFileItemReader.readAsDataURL(currentFile)

         }
    }
    }

    const handleSubmit3 = async (e)=>{
        e.preventDefault()   
        try {
          const formData = new FormData();
          formData.append("api_key",'249459347837371');
          formData.append("file", cropData);
          formData.append("public_id", publicID);
          formData.append("upload_preset", "hrstackMedia");
          const result = await Axios.post('https://api.cloudinary.com/v1_1/stormiscoming/image/upload/', formData)
          setOpen(false);
          const {secure_url, public_id, asset_id } = result.data
          let formdata = { selectedFile:secure_url, filePublicID:public_id, asset_id}
          submitProfilePhoto({userID:data.userID, formdata,}).then((res)=> {
            Swal.fire({
              title: 'Success!',
              text: 'Profile Photo updated Successfully',
              icon: 'success',
              })
          }).catch((err)=>{
            Swal.fire({
              title: 'Uh oh!',
              text: 'Profile Photo updation failed',
              icon: 'info',
              })
          })
        }
        catch (err){
          setError("Failed Saving Profile image")
        }
      }
      const handleSubmit4 = async (e)=>{
        e.preventDefault()
        try {
          const formData = new FormData();
          formData.append("api_key",'249459347837371');
          formData.append("file", cropData);
          formData.append("public_id", "EmployeeProfilEPic/"+data.fullname);
          formData.append("upload_preset", "hrstackMedia");
          const result = await Axios.post('https://api.cloudinary.com/v1_1/stormiscoming/image/upload/', formData)
          setOpen(false);
          const {secure_url, public_id, asset_id } = result.data
          let formdata = { selectedFile:secure_url, filePublicID:public_id, asset_id}
          submitProfilePhoto({userID:data.userID, formdata,}).then((res)=> {
            Swal.fire({
              title: 'Success!',
              text: 'Profile Photo updated Successfully',
              icon: 'success',
              })
          }).catch((err)=>{
            Swal.fire({
              title: 'Uh oh!',
              text: 'Profile Photo updation failed',
              icon: 'info',
              })
          })
        }
        catch (err){
          setError("Failed Saving Profile image")
        }
      }
      
  return (
    <div>
      <Button onClick={handleClickOpen}>
      <MdAddAPhoto /> &nbsp; <small>{popName}</small> 
      </Button>
      <Dialog maxWidth={20}  open={open} onClose={handleClose}>
        <DialogTitle >{"Crop and Upload Image"}</DialogTitle>
        <hr className='w-90' /> 

        <DialogContent>
        <Cropper
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1/1}
          preview=".img-preview"
          src={img.imgSrc}
          viewMode={1/1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} 
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={true}
        />
        <div className='flex justify-center border'>
      {cropData && <img style={{ width: "100%" }} src={cropData} alt="cropped" />}  
        </div>
      <div className='flex flex-col mx-auto items-center py-1 justify-evenly'>
      <label htmlFor="file-upload" className="custom-file-upload">
      <BsFillCloudUploadFill /> <small>Upload Photo</small> 
            </label> 
      <input 
      id="file-upload" 
      type="file" 
      onChange={handleImage}
      style={{display:'none'}}
      />
         {error && <small className='error '> {error} </small  > }
      </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {cropData ? <> 
           {status ? <Button onClick={handleSubmit3}>Save & Upload</Button> : <Button onClick={handleSubmit4}>Save</Button>}    </> 
           :
           <Button onClick={getCropData}>Crop</Button>}
    
        </DialogActions>
      </Dialog>
    </div>
  );
}