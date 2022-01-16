// Components
import {useEffect} from "react"
import HomeHR from "./pages/HomeHR/HomeHR"
import SignIn from "./pages/SignIn/SignIn"
import Timesheet from "./pages/Timesheet/Timesheet"
import ErrorPage from "./pages/Error/Error"
import Management from "./pages/Management/Management"
import AddEvents from "./pages/Management/AddEvents/AddEvents"
import Announcements from "./pages/Management/Announcements/Announcements"
import ManageReq from "./pages/Management/ManageReq/ManageReq"
import LeaveReq from "./pages/Management/ManageReq/LeaveReq"
import VehicleReq from "./pages/Management/ManageReq/VehicleReq"
import AssetsReq from "./pages/Management/ManageReq/AssetsReq"
import ViewPaySlip from "./pages/Management/ViewPaySlip/ViewPaySlip"
import Leave from "./pages/LeaveReq/Leave"
import RaiseIssue from "./pages/RaiseIssue/RaiseIssue"
import ProtectedRoute from "./routes/ProtectedRoutes/ProtectedRoute"
import Learnings from "./pages/Learnings/Learnings"
import SkillSets from "./pages/SkillSets/SkillSets"
import Performance from "./pages/Performance/Performance"
import AddEmployee from "./pages/AddEmployee/AddEmployee"
import RaisedIssue from "./pages/Management/ManageReq/RaisedIssue"

// APIs
import { fetchEmployeeData, fetchStats as fetchAllStats } from './api/api';
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import {Navigate} from "react-router-dom"
import { logout} from "./redux/login/loginSlice"
import { initial, fetchProfile, errorfetching, fetchStats, final} from "./redux/hr/hrSlice"
import { useSelector, useDispatch} from "react-redux"
import jwtDecode from "jwt-decode"


function App() {
  let user = JSON.parse(localStorage.getItem('hr'))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {

    if (user?.token) {
       dispatch(initial())
        const decodedToken = jwtDecode(user.token)
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          dispatch(logout("Session Time Out"))
          navigate("/signin")
        };

        fetchEmployeeData(user.result._id)
        .then((res)=> dispatch(fetchProfile(res.data)))
        .catch(err=> dispatch(errorfetching(err.message)))

        fetchAllStats()
        .then((res)=> dispatch(fetchStats(res.data))) 
        .catch(err=> dispatch(errorfetching(err.message)))
    } 
    if(!user) {
      dispatch(final())
      dispatch(logout("Please Login again"))
      navigate("/signin")
    }
}, [ navigate])

  return (
    <>
    <Routes>
      <Route exact path="/*" element={<ErrorPage />} />
      {/* <Route exact path="/signin" element={<SignIn />} /> */}
      <Route exact path="/signin" element={ user ? <Navigate to="/" /> :<SignIn />} />


      {/* Protected routes */}
      <Route  element= {<ProtectedRoute />}>
       <Route exact path="/" element={ <HomeHR /> } />
       <Route exact path="/management" element={<Management />} />
       <Route exact path="/management/addevents" element={<AddEvents />} />
       <Route exact path="/management/announcements" element={<Announcements />} />
       <Route exact path="/management/payment" element={<ViewPaySlip />} />
       <Route exact path="/management/all-requests" element={<ManageReq />} />
       <Route exact path="/management/all-requests/leave" element={<LeaveReq />} />
       <Route exact path="/management/all-requests/vehicle" element={<VehicleReq />} />
       <Route exact path="/management/all-requests/assets" element={<AssetsReq />} />
       <Route exact path="/add-employee" element={<AddEmployee />} />
       <Route exact path="/management/all-requests/tickets" element={<RaisedIssue />} />
       <Route exact path="/timesheet" element={<Timesheet />} />
       <Route exact path="/leave" element={<Leave />} />
       <Route exact path="/tickets" element={<RaiseIssue />} />
       <Route exact path="/learnings" element={<Learnings />} />
       <Route exact path="/skillsets" element={<SkillSets />} />
       <Route exact path="/performance" element={<Performance />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;

