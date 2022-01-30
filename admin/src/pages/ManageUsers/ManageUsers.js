import React, {useEffect, useState} from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { useNavigate} from 'react-router-dom'
import {AiFillCaretRight} from "react-icons/ai"
import { Link } from 'react-router-dom'
import Swal from "sweetalert2"
import {blockUser, unBlockUser, deleteUser, getAllEmployees} from "../../api/api"
import moment from "moment"
import "./styles.css"
function ManageUsers() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const handleBlock = (id, name)=>{
        Swal.fire({
            title: 'Do you want Block '+ name + ' ?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Block',
            denyButtonText: `Don't Block`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                blockUser(id).then(()=> Swal.fire('User has been Blocked !', '', 'success'))
                .catch((err)=> Swal.fire(err.message, '', 'info'))

            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
       
    }
    const handleUnBlock = (id, name)=>{
        Swal.fire({
            title: 'Do you want Unblock '+ name + ' ?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Unblock',
            denyButtonText: `Don't Unblock`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                unBlockUser(id).then(()=>Swal.fire('User has been Unblocked!', '', 'success'))
                .catch((err)=> Swal.fire(err.message, '', 'info'))
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })

    }
    
    const handleDelete = (id, name)=>{
        Swal.fire({
            title: 'Do you want Delete '+ name + ' ?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                deleteUser(id).then(()=>Swal.fire('User has been Deleted forever!', '', 'success'))
                .catch((err)=> Swal.fire(err.message, '', 'info'))
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })

    }

    
    useEffect(() => {
        getAllEmployees().then((res)=> setUsers(res.data))
        .catch((err)=> console.log(err.message))

    }, [navigate])


    return (
        <>
        <div className='separation'>
        <nav className="rounded-md w-full">
  <ol className="list-reset flex">
    <li> <Link to="/manage-users">Employees </Link></li>
    <li><span className="text-gray-500 mx-2">/</span></li>
    <li className="text-gray-500"></li>
  </ol>
</nav>
        <div className="container mt-1 mb-5 tableView py-2 overflow-x-auto">
            {/* <div className='button-groups button-groups1'> 
            <div className='button-5 font-semibold text-sm my-1 mx-1'  onClick={()=>{navigate('manage-users')}} style={{backgroundColor:"#3283bd"}}> All Requests</div>
                <div className='button-5 font-semibold text-sm my-1 mx-1' onClick={()=>{navigate('/manage-users')}}> Assets Requests</div>
                <div className='button-5 font-semibold text-sm my-1 mx-1'  onClick={()=>{navigate('/manage-users')}}> Raised Tickets</div>
             </div> */}
             <h6 className='font-bold ml-2 my-2 flex'>  All Employees <AiFillCaretRight className='mx-2' />  </h6>
             {!users.length ? <div className='flex justify-center'> <p>No Data</p></div>
                       : <table className="table-auto border-collapse  w-100 text-center rounded-lg border border-gray-400">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Employee Name 
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Employee ID 
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Project
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Date of Join
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                         Current Status
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                         Actions
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Secondary Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white bg-red-400">
                                {users.map((ele, i)=>{
                                    return(
                                        <tr style={{backgroundColor: ele.priority ==="High" ? "#ffe6e6" : ""}} className= "whitespace-nowrap" key={i}>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                       {ele.fullname}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                            {ele.empID}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-500">    {ele?.projectAllocated?.Project}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                        {moment(ele?.dateOfJoin).utc().format('DD-MM-YYYY')}   
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                        {ele.migration?.status ? "On Notice Period" : "Working"}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {ele?.AllEmployees?.AccessStatus ? 
                                                 <div className='button-sm-2'onClick={()=>handleBlock(ele.userID, ele.fullname)}>Block </div>
                                                :
                                                <div className='button-sm-2'onClick={()=>handleUnBlock(ele.userID, ele.fullname)}>UnBlock </div>}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                        <div className='button-sm-4'onClick={()=>handleDelete(ele.userID, ele.fullname)}>Delete </div>
                                        </td>
                                    </tr>
                                    );
                                })}

                            </tbody> 
                        </table>
                        }
                    </div>
        </div>
        <NavBar />
        </>
    )
}

export default ManageUsers
