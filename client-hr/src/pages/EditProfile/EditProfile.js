import React, { useState, useEffect } from "react";
import Navbar from "../../components/NavBar/NavBar";
import "./styles.css";
import {
  saveProfile,
  fetchEmployeeData,
  fetchCompanyInfo,
} from "../../api/api";
import {Link} from "react-router-dom"
import { useParams, useNavigate } from "react-router-dom";
import { Alert, CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetchEmployeeData(id)
      .then((res) => setData(res.data))
      .catch((err) => setErr(err.message));
    fetchCompanyInfo()
      .then((res) => setCompanyDetails(res.data))
      .catch((err) => setErr(err.message));
  }, [navigate, id]);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companyDetails, setCompanyDetails] = useState(null);
  const [data, setData] = useState({});
  const [err, setErr] = useState(null);


  const [form, setForm] = useState(data);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
const handleChange1 = (e)=>  setForm({ ...form, isManager: e.target.checked });

  const handleSubmitForm = (e) => {
    setLoading(true);
    e.preventDefault();
   
    const { houseNo,zipCode,country,state,city, street,isManager, houseName, DesignationName,uanNo,
        panNo,aadhaarNo,pfNo,esiNo,accountNumber,bank, jobLocation,Project,Institute, Institute2,
        PrimaryPhone,SecondaryPhone,degree,passoutYear,board,degree2,passoutYear2,board2, SecondaryEmail, dob} = form
        if(!panNo || !aadhaarNo || !uanNo || !pfNo || !esiNo || !accountNumber || !bank || !zipCode || !houseName) setError("Please Update all Feilds")
    const Designation = {name: DesignationName, isManager,}
    const projectAllocated = {Project, Status:true }
    const address = {houseNo, houseName, zipCode, country, state, city, street, permanentAddress:true}
    const education = {degree, passoutYear, board, Institute}
    const education2 = {degree2, passoutYear2, board2, Institute2}
    const contactInformation = {PrimaryPhone, SecondaryPhone, SecondaryEmail}
    const otherStatutoryInfo = {panNo, aadhaarNo, uanNo, pfNo, esiNo}
    const bankDetails = {accountNumber, bank, }
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        let formData = { jobLocation, Designation, 
            projectAllocated, address, education, education2, dob,
            contactInformation,otherStatutoryInfo, bankDetails, onBoard:true};
            const profile = {userID:data.userID, formData}
        saveProfile(profile)
          .then((res) => {
            setLoading(false);
            Swal.fire("Saved!", "", "success");
            navigate(`/view-employees/${data.userID}`)
          })
          .catch((err) => {
            setError(err.response.message);
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };


  return (
    <div>
      <div className="separation">
        {err && (
          <div className="flex justify-center">
            {" "}
            <Alert severity="warning">{err}</Alert>{" "}
          </div>
        )}
        {error && (
          <div className="flex justify-center">
            {" "}
            <Alert severity="error">{error}</Alert>{" "}
          </div>
        )}
        <div className="separationStatus">
        <div className='flex float-left mr-auto sm:mt-3 mt-4 pl-4'>  
      <Link to="/view-employees" className="button-sm-1" >Back</Link>
        </div>
          <h5 className="font-bold text-center py-2 pt-3">
            {" "}
            Edit Employee Profile
          </h5>
  
          <div className="flex justify-center">
            {" "}
            <hr className="w-11/12 " />{" "}
          </div>

          <h5 className="font-bold ms-4 pt-1"> Contact Information</h5>
          <form>
            <h6 className="font-semibold ms-3 text-base"> Basic Information</h6>
            <div className="flex  align-middle rounded px-11 pt-2 mb-2">
              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Employee Name
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  type="text"
                  name="fullname"
                  onChange={handleChange}
                  defaultValue={data?.fullname}
                  readOnly
                />
              </div>
              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {" "}
                  Employee ID
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  type="text"
                  name="empID"
                  onChange={handleChange}
                  defaultValue={data?.empID}
                  readOnly
                />
              </div>
              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Date of birth{" "}
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  type="date"
                  name="dob"
                  min="1989-10-29"
                  onChange={handleChange}
                  defaultValue={data?.dob}
                />
              </div>
            </div>
            {companyDetails &&     <div className="flex  align-middle rounded px-11 pt-2 mb-2">
              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-lightBlue-600 bg-lightBlue-200">
                  Designation
                </label>
                <select
                  name="DesignationName"
                  id="Designation"
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  type="text"
                  onChange={handleChange}
                  defaultValue={data?.Designation?.name}
                  required
                >
                  {companyDetails.designations.map((ele, i) => {
                    return <option key={i} value={ele}>{ele}</option>;
                  })}
                </select>
              </div>
              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-lightBlue-600 bg-lightBlue-200">
                  Project
                </label>
                <select
                  name="Project"
                  id="Project"
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  type="text"
                  onChange={handleChange}
                  defaultValue={data?.projectAllocated?.Project}
                  required
                >
                  {companyDetails.projects.map((ele, i) => {
                    return <option key={i} value={ele}>{ele}</option>;
                  })}
                </select>
              </div>
              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-lightBlue-600 bg-lightBlue-200">
                  {" "}
                  Job Location
                </label>
                <select
                  name="jobLocation"
                  id="jobLocation"
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  onChange={handleChange}
                  defaultValue={data?.jobLocation}
                  required
                >
                  {companyDetails.locations.map((ele, i) => {
                    return <option key={i} value={ele}>{ele}</option>;
                  })}{" "}
                </select>
              </div>

              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-lightBlue-600 bg-lightBlue-200">
                  is Manager ?
                </label>
                <input
                  type="checkbox"
                  id="isManager"
                  value={data?.Designation?.isManager}
                  onChange={handleChange1}
                  name="isManager"
                  required
                ></input>
              </div>
            </div>}
        
            <h6 className="font-semibold ms-3 text-base"> Permanent Address</h6>
            <div className="flex  align-middle rounded px-11 pt-2 mb-2">
              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {" "}
                  House Number
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  type="text"
                  name="houseNo"
                  onChange={handleChange}
                  defaultValue={data?.address?.houseNo}
                  autocapitalize
                  required
                />
              </div>

              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {" "}
                  House Name
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  type="text"
                  name="houseName"
                  onChange={handleChange}
                  defaultValue={data?.address?.houseName}
                  autocapitalize
                  required
                />
              </div>
              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {" "}
                  Street
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  type="text"
                  name="street"
                  onChange={handleChange}
                  defaultValue={data?.address?.street}
                  autocapitalize
                  required
                />
              </div>

              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {" "}
                  State
                </label>
                <input
                  onChange={handleChange}
                  defaultValue={data?.address?.state}
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  name="state"
                  required
                />
              </div>
            </div>
            <div className="flex  align-middle rounded px-11 pt-2 mb-2">
              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {" "}
                  Country
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  type="text"
                  name="country"
                  onChange={handleChange}
                  defaultValue={data?.address?.country}
                  autocapitalize
                  required
                  
                />
              </div>
              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {" "}
                  Zip
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  type="text"
                  name="zipCode"
                  maxLength="7"
                  onChange={handleChange}
                  defaultValue={data?.address?.zipCode}
                  autocapitalize
                  required
                />
              </div>
            </div>
            {/*new section  */}
            <h6 className="font-semibold ms-3 text-base">
              Perosnal Contact Details{" "}
            </h6>
            <div className="flex  align-middle rounded px-11 pt-2 mb-2">
              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {" "}
                  Primary Phone
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  type="text"
                  name="PrimaryPhone"
                  maxLength="12"
                  onChange={handleChange}
                  defaultValue={data?.contactInformation?.PrimaryPhone}
                  required

                />
              </div>

              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {" "}
                  Secondary Phone
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  type="text"
                  name="SecondaryPhone"
                  maxLength="10"
                  onChange={handleChange}
                  defaultValue={data?.contactInformation?.SecondaryPhone}
                  required
                />
              </div>
              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {" "}
                  Secondary Email
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  type="text"
                  name="SecondaryEmail"
                  onChange={handleChange}
                  defaultValue={data?.contactInformation?.SecondaryEmail}
                  required
                />
              </div>
            </div>
            {/* new section  */}
            <h6 className="font-semibold ms-3 text-base">
              {" "}
              Other Statutary Information
            </h6>
            <div className="flex  align-middle rounded px-11 pt-2 mb-2">
            <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {" "}
                  UAN No.
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  type="text"
                  name="uanNo"
                  maxLength="12"
                  onChange={handleChange}
                  defaultValue={data?.otherStatutoryInfo?.uanNo}
                />
              </div>
              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {" "}
                  PAN No.
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  type="text"
                  name="panNo"
                  maxLength="10"
                  onChange={handleChange}
                  defaultValue={data?.otherStatutoryInfo?.panNo}
                />
              </div>

              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {" "}
                  Aadhar No
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  type="text"
                  name="aadhaarNo"
                  maxLength="12"
                  onChange={handleChange}
                  defaultValue={data?.otherStatutoryInfo?.aadhaarNo}
                  required
                />
              </div>
              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {" "}
                  PF No.
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  type="text"
                  name="pfNo"
                  maxLength="12"
                  onChange={handleChange}
                  defaultValue={data?.otherStatutoryInfo?.pfNo}
                  required
                />
              </div>

              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {" "}
                  ESCI No
                </label>
                <input
                  onChange={handleChange}
                  maxLength="7"
                  defaultValue={data?.otherStatutoryInfo?.esiNo}
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  name="esiNo"
                />
              </div>
            </div>
            <div className="flex  align-middle rounded px-11 pt-2 mb-2">
              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {" "}
                  Account No
                </label>
                <input
                  onChange={handleChange}
                  maxLength="12"
                  pattern="[0-9]"
                  defaultValue={data?.bankDetails?.accountNumber}
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  name="accountNumber"
                />
              </div>
              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {" "}
                  Bank
                </label>
                <input
                  onChange={handleChange}
                  defaultValue={data?.bankDetails?.bank}
                  autocapitalize
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  name="bank"
                />
              </div>
            </div>
            {/* new section */}
            <h6 className="font-semibold ms-3 text-base">
              {" "}
              Educational Details
            </h6>
            <p className="font-medium ms-3 text-base"> Higher Education</p>
            <div className="flex  align-middle rounded px-11 pt-2 mb-2">
              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {" "}
                  Courses
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  type="text"
                  name="degree"
                  onChange={handleChange}
                  autocapitalize
                  defaultValue={data?.education?.degree}
                />
              </div>

              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {" "}
                  Passout Year
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  type="text"
                  name="passoutYear"
                  onChange={handleChange}
                  defaultValue={data?.education?.passoutYear}
                  required
                />
              </div>
              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Board
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  type="text"
                  name="board"
                  onChange={handleChange}
                  autocapitalize
                  defaultValue={data?.education?.board}
                  required
                />
              </div>
              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Institute
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  type="text"
                  name="Institute"
                  onChange={handleChange}
                  autocapitalize
                  defaultValue={data?.education?.Institute}
                  required
                />
              </div>
            </div>
            <div>
              {" "}
              <p className="font-medium ms-3 text-base">
                {" "}
                10th Grade Education
              </p>
            </div>
            <div className="flex  align-middle rounded px-11 pt-2 mb-2">
              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {" "}
                  Courses
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  type="text"
                  name="degree2"
                  onChange={handleChange}
                  autocapitalize
                  defaultValue={data?.education2?.degree2}
                />
              </div>

              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {" "}
                  Passout Year
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  type="text"
                  name="passoutYear2"
                  onChange={handleChange}
                  defaultValue={data?.education2?.passoutYear2}
                  required
                />
              </div>
              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Board
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  type="text"
                  name="board2"
                  onChange={handleChange}
                  autocapitalize
                  defaultValue={data?.education2?.board2}
                  required
                />
              </div>
              <div className="mb-1 md:mr-2 md:mb-0 mx-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Institute
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight  bg-gray-200 border rounded   focus:outline-none focus:shadow-outline"
                  type="text"
                  name="Institute2"
                  onChange={handleChange}
                  autocapitalize
                  defaultValue={data?.education2?.Institute2}
                  required
                />
              </div>
            </div>

            <div className="px-9 items-center justify-center ">
              {loading && (
                <div className="flex justify-center items-center">
                  <CircularProgress color="info" size={20} />
                  <small className="px-1">Updating</small>
                </div>
              )}
            </div>
            <div className="flex  justify-center px-4">
              <button
                type="button"
                onClick={handleSubmitForm}
                className="button-sm-1 my-2 mb-4"
              >
                <small>Update </small>
              </button>
            </div>
          </form>
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default EditProfile;
