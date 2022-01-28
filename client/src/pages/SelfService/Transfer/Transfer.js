import React, {useState} from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw} from 'draft-js';
import draftToHtml from "draftjs-to-html"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import HTML from 'html-parse-stringify'
function Transfer() {
  const [editorState,setEditorState]=useState(EditorState.createEmpty());
  const [textValue, setTextValue] = useState("")

  const formik = useFormik({
    initialValues:{
      codedText:"",
    },
    onSubmit: values=> {
      console.log(textValue)

    },
    validate: values=>{
      let error={}
    
      if(values.codedText){
        error.codedText="*Required "
      } 
      return error
    }
  })
  const  onEditorStateChange= (editorState)=> {     
    setEditorState(editorState)
    setTextValue(draftToHtml(convertToRaw(editorState.getCurrentContent())))


 }
 const handleText=(e)=>{
  setTextValue(textValue)
 }
    return (
        <>        <div className='separation'>
         
            <nav className="rounded-md w-full">
  <ol className="list-reset flex">
    <li> <Link to="/selfservice">Self Service </Link></li>
    <li><span className="text-gray-500 mx-2">/</span></li>
    <li className="text-gray-500">Transfer Request</li>
  </ol>
</nav>
            <div className='separationForm bg-feild p-4 '>
            <form onSubmit={formik.handleSubmit}> 
                <h5 className='mt-4 mb-2 text-center font-semibold'>Employee Transfer Request</h5>
                <div>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
    />
        <textarea  hidden name='codedText' onChange={handleText} value={textValue}>
        </textarea>
        { formik.errors.codedText  ? <small className='ml-1 error'> {formik.errors.codedText} </small> : null}
            </div>
                <div className='flex justify-end'>
                <button className='button-1' type='submit'> Request </button>
                </div>
                </form>
                
            </div>

            <div className='separationStatus'>
            <h5 className='mt-4 mb-2 text-center pt-4 font-semibold'>Transfer Status</h5>
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
                Project
              </th>
              <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
              Transfer Date E
              </th>
              <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                Approved Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b font-medium">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">     12-2-2021</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              Dvelopement & Services
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              Mathew
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              Jacob
              </td>
            </tr>
            <tr className="bg-white border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              Pending
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Pending
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                @fat
              </td>
            </tr>
            <tr className="bg-white border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Larry
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Wild
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                @twitter
              </td>
            </tr>
          </tbody>
        </table>
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

export default Transfer
