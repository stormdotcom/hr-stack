// Components
import {useEffect, useState} from "react"
import HomeAdmin from "./pages/HomeAdmin/HomeAdmin"
import SignIn from "./pages/SignIn/SignIn"
import ErrorPage from "./pages/Error/Error"
import Management from "./pages/Management/Management"
import AddEvents from "./pages/Management/AddEvents/AddEvents"
import ManageReq from "./pages/Management/ManageReq/ManageReq"
import AssetsReq from "./pages/Management/ManageReq/AssetsReq"
import RaiseIssue from "./pages/RaiseIssue/RaiseIssue"
import ProtectedRoute from "./routes/ProtectedRoutes/ProtectedRoute"
import RaisedIssue from "./pages/Management/ManageReq/RaisedIssue"
import AddAssets from "./pages/Management/AddAssets/AddAssets"
// APIs
import {  fetchStats as fetchAllStats } from './api/api';
import { Routes, Route, useNavigate } from "react-router-dom";
import {Navigate} from "react-router-dom"
import {  logout} from "./redux/login/loginSlice"
import { initial,  errorfetching, fetchStats, final} from "./redux/admin/adminSlice"
import {  useDispatch} from "react-redux"
import jwtDecode from "jwt-decode"


function App() {
  const user = JSON.parse(localStorage.getItem("admin"))
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    if (user?.token) {
        const decodedToken = jwtDecode(user.token)
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          dispatch(logout("Session Time Out"))
          navigate("/signin")
        }
        dispatch(initial())
        fetchAllStats()
        .then((res)=>  {
          console.log(res.data)
          dispatch(fetchStats(res.data))
        }) 
        .catch(err=> dispatch(errorfetching(err.message)))

      }
    
}, [navigate])

  return (
    <>
    <Routes>
      <Route exact path="/*" element={<ErrorPage />} />
      {/* <Route exact path="/signin" element={<SignIn />} /> */}
      <Route exact path="/signin" element={ user ? <Navigate to="/" /> :<SignIn />} />


      {/* Protected routes */}
      <Route  element= {<ProtectedRoute />}>
       <Route exact path="/" element={ <HomeAdmin /> } />
       <Route exact path="/management" element={<Management />} />
       <Route exact path="/management/addevents" element={<AddEvents />} />
       <Route exact path="/management/assets" element={<AddAssets />} />
       <Route exact path="/management/all-requests" element={<ManageReq />} />
       <Route exact path="/management/all-requests/assets" element={<AssetsReq />} />
       <Route exact path="/management/all-requests/tickets" element={<RaisedIssue />} />
       <Route exact path="/tickets" element={<RaiseIssue />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
