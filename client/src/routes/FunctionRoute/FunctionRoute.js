import {  Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


const FunctionRoute = ()=>{
    const {data} = useSelector(state => state.employee)

    // const { isAuth} = user
    return data?.onBoard  ?   <Outlet />  : <Navigate to='/' />
    // return isAuth ? <Outlet /> : <SignIn/>
}

export default FunctionRoute;