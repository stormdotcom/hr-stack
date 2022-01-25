import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' });


export const signIn = (formData) => API.post('/hr/signin', formData);
export const fetchEmployeeData = (id) => API.get('/hr/fetchEmployeeData?id='+id);
export const fetchStats =  () => API.get('/hr/fetchStats');
export const getPendingTimeSheet= ()=> API.get('/hr/getPendingTimeSheet')
export const timeSheetApprove=(data)=>API.post('/hr/timeSheetApprove', data)
export const createEvent=(data)=>API.post('/hr/createEvent', data)
export const addEmployee=  (data) => API.post("/hr/add-employee", data)
export const submitTicket = (form)=> API.post('/submitTicket', form)
export const myTickets = (id)=> API.get('/myTickets?userID='+id)
export const leaveApprove = (formData)=> API.post('/leaveApprove', formData)
export const leaveDecline = (data)=> API.post('/leaveDecline',data)
export const activeTickets = ()=> API.get('/activeTickets')
export const approveLearning = (form)=> API.post('/hr/approveLearning', form)
export const declineLearning = (form)=> API.post('/hr/declineLearning', form)
export const getLeaveRequest=()=> API.get('/hr/getAllLeaveRequest')
export const getAllEmployees=()=> API.get('/hr/getAllEmployees')
export const getLearningRequest = ()=> API.get('/hr/getLearningRequest')
export const fetchCompanyInfo = ()=> API.get('/hr/fetchCompanyInfo')
export const saveProfile = (data)=> API.patch('/hr/saveProfile',data)
export const getSkillsRequest = ()=> API.get('/hr/getSkillsRequest')
export const skillreject = (form)=> API.post('/hr/skillreject', form)
export const skillApprove = (form)=> API.post('/hr/skillApprove', form)
export const createAnnouncement = (form) => API.post('/hr/createAnnouncement', form)
