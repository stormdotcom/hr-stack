import React, {useState, useEffect} from 'react'
import "./styles.css"
import { useParams, useNavigate } from "react-router-dom"
import { useFormik } from 'formik';
import { LinearProgress  } from '@mui/material';
import Alert from '@mui/material/Alert';
import { changeProject, fetchCompanyInfo, fetchEmployeeData } from '../../api/api';
import NavBar from '../../components/NavBar/NavBar';
import Swal from 'sweetalert2'
import moment from "moment"
function ChangeProject() {

  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const { id } = useParams();
  const [loading, setLoading] = useState(false)
  const [project, setproject] = useState([])
  const [employee, setemployee] = useState({})
  useEffect(() => {
    fetchCompanyInfo().then(res=> setproject(res?.data?.projects))
    .catch(err=> setError(err.message))
    fetchEmployeeData(id).then(res=> setemployee(res.data))
    .catch(err=> setError(err.message))
    return () => {
        setproject([])
        setemployee({})
    }
  }, [navigate])
  
  const handleSubmit =async (values)=>{
    try { 
        setLoading(true)
        changeProject(values).then((res)=> {
        setLoading(false)
        setError(false)
        Swal.fire({
            title: 'Success!',
            text: 'Updated  Successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          navigate('/view-employees')
      }).catch(error=> setError(error.response.data.message))

    } catch (error) { 
        setError(error.response.data.message)
      
    }
  }
  const formik = useFormik({
    initialValues:{
        project:"",
      id:id,
    },
    onSubmit: (values, {  resetForm } )=> { 
      handleSubmit(values)
      resetForm()

    },
    // validationSchema:(schema),
    validate: values=>{
      let error={}
      if(!values.project) {
        error.project="* Required"
      }
      return error
    }
  })

    return (
        <div>
      <div className='separation'>
          <div className='separationStatus'>
        <form onSubmit={formik.handleSubmit}>
        <div className=" bg-grey align-middle rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h5 className='font-semibold metal m-auto pb-2'>Update Project</h5>           
            <div className='mb-4'>
              {error &&    <div className='flex justify-center'> <Alert severity="error">{error}!</Alert></div> }
              <div className='flex justify-between'> 

<div className="mb-6 w-1/4">
<div className="w-full py-2 pl-1 flex flex-col addEmployee">
<label className="block mb-2 text-sm font-medium text-lightBlue-600 bg-lightBlue-200">
Employee Name
                </label>
  <p className='text-lg fond-semibold'> {employee?.fullname}</p>
 
</div>
</div>

<div className="mb-6 w-1/4">
<div className="w-full py-2 pl-1 flex flex-col">
<label className="block mb-2 text-sm font-medium text-lightBlue-600 bg-lightBlue-200">
Current Designation
                </label>
<p className='text-lg fond-semibold'> {employee?.Designation?.name}</p>
</div>
</div>

<div className="mb-6 w-1/4">
<div className="w-full py-2 pl-1 flex flex-col">
<label className="block mb-2 text-sm font-medium text-lightBlue-600 bg-lightBlue-200">
Current Project
                </label>
<p className='text-lg fond-semibold'> {employee?.projectAllocated?.Project}</p>
</div>
</div>

<div className="mb-6 w-1/4">
<div className="w-full py-2 pl-1 flex flex-col addEmployee">
<label className="block mb-2 text-sm font-medium text-lightBlue-600 bg-lightBlue-200">
Experience <small>(in months) </small>
                </label>
<p className='text-lg fond-semibold'> {moment(employee?.dateOfJoin).fromNow()}</p>
 
</div>
</div>
</div>
            <div className="py-2 pl-1 flex-col">
              <label className="block mb-2 text-sm font-medium text-lightBlue-600 bg-lightBlue-200">
              Project
                </label>
            <select
              className="w-full px-1 py-2"
               onChange={formik.handleChange}
               value={formik.values.project}
               onBlur={formik.handleBlur}
               id="position"
               name="project"
               type="text"
                >
                  {project.map((ele, i) => {
                    return <option key={i} value={ele}>{ele}</option>;
                  })}
                </select>
          </div>

          {formik.touched.email && formik.errors.email  ? <small className='ml-1 error'> {formik.errors.email} </small> : null}
            </div>
          
          <div className=" items-center justify-center">
          {!error && loading && <div className='flex flex-col justify-center items-center'><LinearProgress  color="info"   /> <small className='px-1'>...</small> </div> }
            <button type='submit' className="button-1 w-full my-2"> 
              Update
            </button>
          </div>
        </div>
        </form>
        </div>
       
      </div>
      <NavBar />
      </div>
    );
}

export default ChangeProject
