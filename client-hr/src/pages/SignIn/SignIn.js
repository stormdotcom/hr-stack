import React from 'react'
import "./styles.css"
import {FaUserAlt} from "react-icons/fa";
import {RiLockPasswordFill} from "react-icons/ri"
import Stack from "../../components/NavBar/Stack-logo.svg";
import {Link, useNavigate } from "react-router-dom"
import { useFormik } from 'formik';
import {loginFail, loginPending, loginSuccess} from "../../redux/login/loginSlice"
import {useDispatch, useSelector} from "react-redux"
import { CircularProgress } from '@mui/material';
import Alert from '@mui/material/Alert';
import { signIn } from '../../api/api';
function SignIn() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector(state => state.login)
  const handleSubmit =async (values)=>{
    try { 
      dispatch(loginPending())
      signIn(values).then((res)=> {
        dispatch(loginSuccess(res.data.result))
        localStorage.setItem('hr', JSON.stringify(res.data))
        navigate("/")
        
      }).catch(err=> dispatch(loginFail(err.response.data.message)))

    } catch (error) { 
      dispatch(loginFail(error.message))
      
    }
  }
  const formik = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    onSubmit: values=> {

      handleSubmit(values)

    },
    validate: values=>{
      let error={}
      if(!values.email) {
        error.email="*Email Required"
      }
      if(!values.password) {
        error.password="*Password Required"
      }
      return error
    }
  })
    return (
      <div className='signin'>
        <form onSubmit={formik.handleSubmit}>
        <div className="form bg-white align-middle rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <small className='font-thin metal m-auto '>Human Resouce Stack</small>           
         <div className='logoSec mt-2'>
                
            <h5> HR </h5>
                <img  alt="logo"  height="20px" src={Stack} /> 
            </div>
            <div className='mb-4'>
              {error &&     <Alert severity="error">{error}!</Alert> }
            <div className=" shadow appearance-none border rounded w-full py-2 pl-1 flex">
              <FaUserAlt className='mx-2' />
            <input
              className=""
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              id="email"
              name="email"
              type="email"
              placeholder="Email"
            />
           
          </div>
          {formik.touched.email && formik.errors.email  ? <small className='ml-1 error'> {formik.errors.email} </small> : null}
            </div>
        
          <div className="mb-6">
          <div className="shadow appearance-none border rounded w-full py-2 pl-1 flex">
          <RiLockPasswordFill className='mx-2' />
            <input
              className=""
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              name="password"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          {formik.touched.password && formik.errors.password ? <small className='error'> {formik.errors.password} </small> : null}
           
          </div>
          <div className=" items-center justify-center">
          {isLoading && <div className='flex justify-center items-center'><CircularProgress  color="info" size={20}  /> <small className='px-1'>Logging in</small> </div> }
            <button type='submit' className="button-1 w-full my-2"> 
              Sign In
            </button>
          </div>
        </div>
        </form>
       
      </div>
    );
}

export default SignIn
