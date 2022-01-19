import  express from 'express';
const router = express.Router();
import { signin, createHR, logout, fetchAllEmployeData, getPendingTimeSheet, timeSheetApprove, createEvent, getAllLeaveRequest,
  getLearningRequest, fetchStats, approveLearning, declineLearning} from "../contollers/hr.js";
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

export default router;

