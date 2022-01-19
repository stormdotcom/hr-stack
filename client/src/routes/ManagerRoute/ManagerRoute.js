import {  Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


const ManagerRoute = ()=>{
    const {data} = useSelector(state => state.employee)

    // const { isAuth} = user
    return data?.Designation?.isManager  ?   <Outlet />  : <Navigate to='/selfservice' />
    // return isAuth ? <Outlet /> : <SignIn/>
}

export default ManagerRoute;
