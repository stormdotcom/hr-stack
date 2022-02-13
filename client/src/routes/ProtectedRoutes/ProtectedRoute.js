import {  Navigate, Outlet} from "react-router-dom";
// import { useSelector } from "react-redux";
// import jwtDecode from "jwt-decode";
// import { logout} from "../../redux/login/loginSlice"


const ProtectedRoute = ()=>{

    const user = JSON.parse(localStorage.getItem("employee"))


    return  user ? <Outlet /> : <Navigate to ="/signin" />
    // return isAuth ? <Outlet /> : <SignIn/>
}

export default ProtectedRoute;
