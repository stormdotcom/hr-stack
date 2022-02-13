import React, { useEffect } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { AiFillCaretRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  getLeaveRequest,
  activeTickets,
  getLearningRequest,
  getAssetRequest,
  getCabRequest
} from "../../../api/employee";
import {
  initial,
  fetchRequest,
  fetchTickets,
  fetchLearnings,
  fetchAssets,
  fetchCab
} from "../../../redux/requests/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import Swal from "sweetalert2";
function ManageReq() {
  const { data } = useSelector((state) => state.employee);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.Designation?.isManager) {
      dispatch(initial());
      getLeaveRequest()
        .then((res) => dispatch(fetchRequest(res.data)))
        .catch((err) => console.log(err.message));

      activeTickets()
        .then((res) => dispatch(fetchTickets(res.data)))
        .catch((err) => console.log(err.message));

      getLearningRequest()
        .then((res) => dispatch(fetchLearnings(res.data)))
        .catch((err) => console.log(err.message));

        getAssetRequest()
        .then((res) => dispatch(fetchAssets(res.data)))
        .catch((err) => console.log(err.message));

        getCabRequest()
        .then((res) => dispatch(fetchCab(res.data)))
        .catch((err) => console.log(err.message));
    }
  }, [navigate, dispatch, data?.Designation?.isManager]);
  const { reqData, tickets, learnings, assets, cab } = useSelector((state) => state.request);
  let isloading = false;
  if (!reqData.length && !tickets.length && !learnings.length && !assets.length &&  !cab.length) isloading = true;
  const handleView = (data, name, id, type) => {
    Swal.fire({
      title: "<strong>" + type + "</strong>",
      html:
        " <b>" +
        name +
        "</b> | " +
        " <b>" +
        id +
        "\n </b>" +
        "</br>" +
        "\n" +
        data +
        "\n",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
    });
  };

  return (
    <>
      <div className="viewPay">
        <nav className="rounded-md w-full">
          <ol className="list-reset flex">
            <li>
              {" "}
              <Link to="/selfservice">Self Services </Link>
            </li>
            <li>
              <span className="text-gray-500 mx-2">/</span>
            </li>
            <li className="text-gray-500">Manage Requests</li>
          </ol>
        </nav>
        <div className="container my-5 tableView py-4 overflow-x-auto">
          <div className="button-groups">
            <div
              className="button-5 font-semibold text-sm my-1"
              onClick={() => {
                navigate("/selfservice/all-requests");
              }}
              style={{ backgroundColor: "#3283bd" }}
            >
              {" "}
              All Requests
            </div>
            <div
              className="button-5 font-semibold text-sm my-1"
              onClick={() => {
                navigate("/selfservice/all-requests/leave");
              }}
            >
              {" "}
              Leave Requests
            </div>
            <div
              className="button-5 font-semibold text-sm my-1"
              onClick={() => {
                navigate("/selfservice/all-requests/vehicle");
              }}
            >
              {" "}
              Vehicle Requests
            </div>
            <div
              className="button-5 font-semibold text-sm my-1"
              onClick={() => {
                navigate("/selfservice/all-requests/assets");
              }}
            >
              {" "}
              Assets Requests
            </div>
            <div
              className="button-5 font-semibold text-sm my-1"
              onClick={() => {
                navigate("/selfservice/all-requests/learnings");
              }}
            >
              {" "}
              Learnings{" "}
            </div>
            <div
              className="button-5 font-semibold text-sm my-1"
              onClick={() => {
                navigate("/selfservice/all-requests/tickets");
              }}
            >
              {" "}
              View Tickets
            </div>
          </div>
          <h6 className="font-bold ml-2 my-2 flex">
            {" "}
            All Requests <AiFillCaretRight className="mx-2" />{" "}
          </h6>
          <table className="table-auto border-collapse  w-100 text-center rounded-lg border border-gray-400">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-xs text-gray-500 ">
                  Employee Name
                </th>
                <th className="px-4 py-2 text-xs text-gray-500 ">
                  Employee ID
                </th>
                <th className="px-4 py-2 text-xs text-gray-500 ">Project</th>
                <th className="px-4 py-2 text-xs text-gray-500 ">
                  Request Type
                </th>
                <th className="px-4 py-2 text-xs text-gray-500 ">
                  Approved Status
                </th>
                <th className="px-4 py-2 text-xs text-gray-500 ">Comments</th>
                {/* <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Actions
                                    </th> */}
              </tr>
            </thead>
            {isloading ? (
              <tbody>
                <tr>
                 <td> No Data...</td>
                </tr>
              </tbody>
            ) : (
              <tbody className="bg-white ">
                {reqData.map((ele, i) => {
                  return (
                    <tr className="whitespace-nowrap" key={i}>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {ele.fullname}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{ele.empID}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {" "}
                          {ele.projectName}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">Leave</td>
                      <td className="text-sm px-6 py-4">
                        {ele.approvedStatus ? "Approved" : "Pending"}
                      </td>
                      <td className="text-sm px-6 py-4">
                        <div
                          className="button-sm-1"
                          onClick={() =>
                            handleView(
                              ele.reason,
                              ele.fullname,
                              ele.empID,
                              "Leave"
                            )
                          }
                        >
                          View{" "}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {tickets.map((ele, i) => {
                  return (
                    <tr className="whitespace-nowrap" key={i}>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {ele.employeeName}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {ele.employeeID}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {" "}
                          {ele.project}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        Technical Issue
                      </td>
                      <td className="text-sm px-6 py-4">
                        {ele.resolved ? "Resolved" : "Pending"}
                      </td>
                      <td className="text-sm px-6 py-4">
                        <div
                          className="button-sm-1"
                          onClick={() =>
                            handleView(
                              ele.issue,
                              ele.employeeName,
                              ele.employeeID,
                              "Tech Issue"
                            )
                          }
                        >
                          View{" "}
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {assets.map((ele, i)=>{
                  return (
                    <tr className="whitespace-nowrap" key={i}>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {ele.employeeName}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {ele.employeeID}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {" "}
                          {ele.projectName}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        Assets Request
                      </td>
                      <td className="text-sm px-6 py-4">
                        {ele.resolved ? "Resolved" : "Pending"}
                      </td>
                      <td className="text-sm px-6 py-4">
                        <div
                          className="button-sm-1"
                          onClick={() =>
                            handleView(
                              ele.comments,
                              ele.employeeName,
                              ele.employeeID,
                              "Asset Request"
                            )
                          }
                        >
                          View{" "}
                        </div>
                      </td>
                    </tr>
                  )
                })}
                  {cab.map((ele, i)=>{
                  return (
                    <tr className="whitespace-nowrap" key={i}>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {ele.employeeName}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {ele.empID}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {" "}
                          {ele.projectName}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        Cab Request
                      </td>
                      <td className="text-sm px-6 py-4">
                        {ele.approved ? "Resolved" : "Pending"}
                      </td>
                      <td className="text-sm px-6 py-4">
                        <div
                          className="button-sm-1"
                          onClick={() =>
                            handleView(
                              ele.remarks,
                              ele.employeeName,
                              ele.employeeID,
                              "Cab Request"
                            )
                          }
                        >
                          View{" "}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>
      <NavBar />
    </>
  );
}

export default ManageReq;
