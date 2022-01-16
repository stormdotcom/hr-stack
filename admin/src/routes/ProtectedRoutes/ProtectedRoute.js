import {  Navigate, Outlet, useNavigate} from "react-router-dom";


const ProtectedRoute = ()=>{
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("admin"))

    return  user ? <Outlet /> : <Navigate to ="/signin" />
    // return isAuth ? <Outlet /> : <SignIn/>
}

export default ProtectedRoute;
