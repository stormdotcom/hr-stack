import {  Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


const PublicRoute = ()=>{
    // const user = useSelector(state => state.login)
    const token = localStorage.getItem('employee')

    // const { isAuth} = user
    return token  ?  <Navigate to='/' /> : <Outlet /> 
    // return isAuth ? <Outlet /> : <SignIn/>
}

export default PublicRoute;
