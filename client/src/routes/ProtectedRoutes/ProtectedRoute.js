import {  Navigate, Outlet, useNavigate} from "react-router-dom";
// import { useSelector } from "react-redux";
// import jwtDecode from "jwt-decode";
// import { logout} from "../../redux/login/loginSlice"
import { useDispatch } from "react-redux";

const ProtectedRoute = ()=>{
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("employee"))
    const dispatch = useDispatch()
    // const {isAuth} = useSelector(state => state.login) 


    return  user ? <Outlet /> : <Navigate to ="/signin" />
    // return isAuth ? <Outlet /> : <SignIn/>
}

export default ProtectedRoute;
