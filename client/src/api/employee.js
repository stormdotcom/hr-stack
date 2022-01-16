import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' });


export const signIn = (formData) => API.post('/signin', formData);
export const fetchEmployeeData = (id) => API.get('/fetchEmployeeData?id='+id);
export const getTimeSheet = (id)=> API.get("/get-timesheet?id="+id)
export const timeIn = (id)=> API.post("/timeIn", id)
export const timeOut = (id)=> API.post("/timeOut",id)
export const timeInStats =(id)=> API.get("/timeInStats?id="+id)
export const timeOutStats =(id)=> API.get("/timeOutStats?id="+id)
export const getEvents = ()=> API.get('/getEvents')

export const leaveApprove = (formData)=> API.post('/leaveApprove', formData)

export const leaveDecline = (data)=> API.post('/leaveDecline',data)
export const submitLeave = (form)=> API.post('/submitLeave',form)
export const getLeaveRequest=()=> API.get('/getLeaveRequest')
// todo
export const getHoliday = ()=> API.get('/getHoliday')


