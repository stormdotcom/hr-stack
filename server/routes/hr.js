import  express from 'express';
const router = express.Router();
import { signin, createHR, logout, fetchAllEmployeData, getPendingTimeSheet, timeSheetApprove, createEvent, getSkillsRequest, getFullData,
  getCurrentMonthTmeSheet, submitPayment,
  getAllLeaveRequest, fetchCompanyInfo,skillApprove,skillreject, createAnnouncement, getCabRequest, cabApprove, cabDecline, unsetPerformer, getMonth,
  addDesigination, changePostion, changeProject,
  getSperationRequest, getTransferRequest,approveSeperation,declineSeperation, getAllEmployeesBySkills, getAllManagers, submitAward, getAllEmployeesName,
  getLearningRequest, fetchStats, approveLearning, declineLearning, getAllEmployees, addDesignations, saveProfile} from "../contollers/hr.js";
import { createUser, fetchEmployeData, getPerformer } from "../contollers/employee.js"
/* GET home page. */
router.get('/hr', function(req, res, next) {
  res.send("hr");
});


router.post('/signin', signin);
router.get('/fetchEmployeeData', fetchEmployeData);
router.get('/fetchAll', fetchAllEmployeData);
router.get('/fetchStats', fetchStats);
router.get('/getPendingTimeSheet', getPendingTimeSheet);
router.post('/timeSheetApprove', timeSheetApprove);
router.post('/createHR', createHR);
router.post('/createEvent', createEvent)
router.post('/add-employee', createUser)
router.post('/logout', logout)
router.get('/getAllLeaveRequest', getAllLeaveRequest);
router.get('/getLearningRequest', getLearningRequest);
router.post('/approveLearning', approveLearning);
router.post('/declineLearning', declineLearning);
router.get('/getAllEmployees', getAllEmployees);
router.get('/fetchCompanyInfo', fetchCompanyInfo);
router.patch('/saveProfile', saveProfile);
router.post('/addDesignations', addDesignations);
router.get('/getSkillsRequest', getSkillsRequest);
router.post('/skillreject', skillreject);
router.post('/skillApprove', skillApprove);
router.post('/createAnnouncement', createAnnouncement);
router.get('/getCabRequest', getCabRequest);
router.get('/cabApprove', cabApprove);
router.post('/cabDecline', cabDecline)
router.get('/getSperationRequest', getSperationRequest);
router.get('/getTransferRequest', getTransferRequest);
router.patch('/approveSeperation', approveSeperation);
router.patch('/declineSeperation', declineSeperation);
router.patch('/approveTransfer', approveSeperation);
router.patch('/declineTransfer', declineSeperation);
router.get('/getAllEmployeesBySkills', getAllEmployeesBySkills);
router.get('/getAllManagers', getAllManagers);
router.post('/submitAward', submitAward);
router.post('/unsetPerformer', unsetPerformer);
router.get('/getPerformer', getPerformer);
router.get('/getAllEmployeesName', getAllEmployeesName);
router.get('/getFullData', getFullData);
router.get('/getMonth', getMonth)
router.post('/getCurrentMonthTmeSheet', getCurrentMonthTmeSheet);
router.post('/submitPayment', submitPayment);
router.post('/addDesigination', addDesigination);
router.post('/changePostion', changePostion);
router.post('/changeProject', changeProject);

export default router;

