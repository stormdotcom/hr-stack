import  express from 'express';
const router = express.Router();
import { signin, createHR, logout, fetchAllEmployeData, getPendingTimeSheet, timeSheetApprove, createEvent, getSkillsRequest,
  getAllLeaveRequest, fetchCompanyInfo,skillApprove,skillreject, createAnnouncement,
  getLearningRequest, fetchStats, approveLearning, declineLearning, getAllEmployees, addDesignations, saveProfile} from "../contollers/hr.js";
import { createUser, fetchEmployeData } from "../contollers/employee.js"
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

export default router;

