import React,{useState, useEffect} from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import "./styles.css"
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw} from 'draft-js';
import draftToHtml from "draftjs-to-html"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {useNavigate} from "react-router-dom"
import Swal from "sweetalert2"
import {submitSeperation, getSeperationInfo} from "../../../api/employee"
import { useSelector } from 'react-redux';
import moment from "moment"
function Seperation() {
  const navigate = useNavigate()
  const {data} = useSelector(state=> state.employee)
  const [editorState,setEditorState]=useState(EditorState.createEmpty());
  const [textValue, setTextValue] = useState("")
  const [status, setStatus] = useState(null)
  const [reactCode, setReactCode] = useState("")

  const handleSumit = (draftData)=>{
    Swal.fire({
      title: 'Do you want to Submit Seperation Request?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Request',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        let form = {fullname:data.fullname, empID:data.empID,type:"Seperation", text:textValue, leaving:true, data:draftData, userID:data.userID}
        submitSeperation(form).then((res)=>{
          setEditorState(EditorState.createEmpty())
          Swal.fire('Request Saved!', '', 'success')
          getSeperationInfo(data.userID).then(res=> setStatus(res.data))
          .catch(err=> console.log(err.message))
        }).catch(err => Swal.fire('Error Requesting ', '', 'info'))
       
      } else if (result.isDenied) {
        Swal.fire('Request are not saved', '', 'info')
      }
    })
  }
  const formik = useFormik({
    initialValues:{
      codedText:"",
    },
    onSubmit: values=> {
      let error={}
      if( status && !status?.submittedStatus) {
        Swal.fire({
          icon: 'info',
          title: 'Seperation request Already Exists',
          text: 'Your Seperation request on pending. Please be patient the request will resolve shortly',
        })
        return
      }
      if(status && status?.submittedStatus && status?.approvedStatus) {
        Swal.fire({
          icon: 'info',
          title: 'Request already Submiited',
          text: 'Exit date will be on '+ moment(status?.leavingDate).utc().format('DD-MM-YYYY')
        })
        return
      }
      if(!textValue){
        error.codedText="*please write seperation request in detail"
        return
      } 
      console.log(textValue)
      handleSumit(reactCode)

    },
    validate: values=>{
      let error={}
      if(!textValue){
        error.codedText="*please write seperation request in detail"
      } 
      return error
    }
  })
 

  const  onEditorStateChange= (editorState)=> {     
      setEditorState(editorState)
      setTextValue((convertToRaw(editorState.getCurrentContent())).blocks[0]?.text)
      setReactCode(draftToHtml(convertToRaw(editorState.getCurrentContent())))
   }
   const handleView = (data)=>{
    Swal.fire({
      title: '<strong>Separation Rejected Reason </strong>',
      html:+" "+ data+  "\n",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
    })
  }

   useEffect(()=>{
        getSeperationInfo(data.userID).then(res=> setStatus(res.data))
        .catch(err=> console.log(err.message))
        return (()=> {
          setStatus(null)})
   }, [navigate, data.userID])
    return (
        <>        <div className='separation'>
            <div>

            </div>

            <div className='separationForm bg-feild p-4 '>
            <nav className="rounded-md w-full">
          <ol className="list-reset flex">
            <li> <Link to="/selfservice">Self Services </Link></li>
            <li><span className="text-gray-500 mx-2">/</span></li>
            <li className="text-gray-500">Separation Request</li>
          </ol>
        </nav>
            <form onSubmit={formik.handleSubmit}> 
            <h5 className='mt-4 mb-2 text-center font-semibold'>Employee Separation Request</h5>
        
            <div>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
    />
        <textarea  hidden name='codedText'  onChange={formik.handleChange} value={textValue}>
        </textarea>
        { formik.errors.codedText  ? <small className='ml-1 error'> {formik.errors.codedText} </small> : null}
            </div>
                <div className='flex justify-end'>
                <button className='button-1'type='submit'  > Request </button>
                </div>
               </form>
                
                
            </div>

        {status &&        <div className='separationStatus'>
            <h5 className='mt-4 mb-2 text-center pt-4 font-semibold'>Separation Status</h5>
            <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
            <tr>
              <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                Date Requested
              </th>
              <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                Leaving Date
              </th>
              <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                Approved Status
              </th>
              <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                Comments
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b font-medium">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {moment(status.requestedDate).utc().format('DD-MM-YYYY')}</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {status?.leavingDate  ? moment(status.leavingDate).utc().format('DD-MM-YYYY') : "-"}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {(status.submittedStatus && status.approvedStatus) && "Approved" }
              {(status.submittedStatus && !status.approvedStatus) && "Rejected" }
              {(!status.submittedStatus && !status.approvedStatus) && "Pending" }
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {(status.submittedStatus && !status.approvedStatus) ? <div className='button-sm-1'onClick={()=>handleView(status.comments)} >View </div> : ""}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
            </div>}

            
        </div>
        <NavBar />
        </>

    )
}

export default Seperation
