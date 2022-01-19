import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' });

export const signIn = (formData) => API.post('/admin/signin', formData);
export const fetchStats =  () => API.get('/admin/fetchStats');
export const getPendingTimeSheet= ()=> API.get('/hr/getPendingTimeSheet')
export const timeSheetApprove=(data)=>API.post('/hr/timeSheetApprove', data)
export const createEvent=(data)=>API.post('/hr/createEvent', data)
export const blockUser=  (id) => API.get("/admin/blockUser?id="+id)
export const addAsset = (data)=> API.post("/admin/addAsset", data)
export const getLeaveRequest=  () => API.get("/getLeaveRequest")
export const activeTickets=  () => API.get("/activeTickets")
export const resolveIssue =(data)=> API.post('/admin/resolveIssue', data)
export const delayIssue =(data)=> API.post('/admin/delayIssue',data)
