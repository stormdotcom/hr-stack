import SignIn from "./pages/SignIn/SignIn"
import Home from "./pages/Home/Home"
import Timesheet from "./pages/Timesheet/Timesheet"
import ErrorPage from "./pages/Error/Error"
import SelfService from "./pages/SelfService/SelfService"
import { Routes, Route } from "react-router-dom";
import Seperation from "./pages/SelfService/Separation/Separation"
import Transfer from "./pages/SelfService/Transfer/Transfer"
import Cab from "./pages/SelfService/Cab/Cab"
import ManageReq from "./pages/SelfService/ManageReq/ManageReq"
import LeaveReq from "./pages/SelfService/ManageReq/LeaveReq"
import VehicleReq from "./pages/SelfService/ManageReq/VehicleReq"
import AssetsReq from "./pages/SelfService/ManageReq/AssetsReq"
import ViewPaySlip from "./pages/SelfService/ViewPaySlip/ViewPaySlip"
import Assets from "./pages/SelfService/Assets/Assets"
import Leave from "./pages/LeaveReq/Leave"
import RaiseIssue from "./pages/RaiseIssue/RaiseIssue"
import ProtectedRoute from "./routes/ProtectedRoutes/ProtectedRoute"
import Learnings from "./pages/Learnings/Learnings"
import SkillSets from "./pages/SkillSets/SkillSets"
import Performance from "./pages/Performance/Performance"
import LearningsReq from "./pages/SelfService/ManageReq/LearningsReq"
import RaisedIssue from "./pages/SelfService/ManageReq/RaisedIssue"




function App() {

  return (
    <>
    <Routes>
      {/* <Route path="/" element={isAuth ? <Navigate to="/home" /> : <SignIn /> } /> */}
      <Route exact path="/signin" element={ <SignIn /> } />
      <Route exact path="/*" element={<ErrorPage />} />
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
       <Route exact path="/" element={<Home /> } />
       <Route exact path="/selfservice" element={<SelfService />} />
       <Route exact path="/selfservice/separation" element={<Seperation />} />
       <Route exact path="/selfservice/transfer" element={<Transfer />} />
       <Route exact path="/selfservice/viewslip" element={<ViewPaySlip />} />
       <Route exact path="/selfservice/vehicle" element={<Cab />} />
       <Route exact path="/selfservice/assets" element={<Assets />} />
       <Route exact path="/selfservice/all-requests" element={<ManageReq />} />
       <Route exact path="/selfservice/all-requests/leave" element={<LeaveReq />} />
       <Route exact path="/selfservice/all-requests/vehicle" element={<VehicleReq />} />
       <Route exact path="/selfservice/all-requests/assets" element={<AssetsReq />} />
       <Route exact path="/selfservice/all-requests/learnings" element={<LearningsReq />} />
       <Route exact path="/selfservice/all-requests/tickets" element={<RaisedIssue />} />
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

// gik-xbda-hwu