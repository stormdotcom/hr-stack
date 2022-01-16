import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' });


export const signIn = (formData) => API.post('/hr/signin', formData);
export const fetchEmployeeData = (id) => API.get('/hr/fetchEmployeeData?id='+id);
export const fetchStats =  () => API.get('/hr/fetchStats');
export const getPendingTimeSheet= ()=> API.get('/hr/getPendingTimeSheet')
export const timeSheetApprove=(data)=>API.post('/hr/timeSheetApprove', data)
export const createEvent=(data)=>API.post('/hr/createEvent', data)

export const addEmployee=  (data) => API.post("/hr/add-employee", data)
