import  express from 'express';
import { signin, createUser, logout, fetchEmployeData, timeInStats, timeOutStats, getEvents, getHoliday, leaveDecline, submitPersonalInfo,
       submitAddress, submitSkills, getMyskills, getAnnouncements,
        leaveApprove, submitTicket, allActiveTicket, myTickets, setPriority, checkLeaveStatus, submitLearningRequest, getMyLearnings,
        submitLeave, getTimeSheet, setTimeIn, setTimeOut, getLeaveRequest} from "../contollers/employee.js"
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("employee");
});

router.post('/signin', signin);
router.get('/fetchEmployeeData', fetchEmployeData);
router.get('/get-timesheet', getTimeSheet);
router.post('/timeIn', setTimeIn);
router.post('/timeOut', setTimeOut);
router.post('/createUser', createUser);
router.post('/logout', logout)
router.get('/timeInStats', timeInStats)
router.get('/timeOutStats', timeOutStats)
router.get('/getHoliday', getHoliday)
router.post('/submitLeave', submitLeave)
router.get('/getLeaveRequest', getLeaveRequest)
router.post('/leaveApprove', leaveApprove)
router.post('/leaveDecline', leaveDecline)
router.get('/activeTickets', allActiveTicket)
router.post('/submitTicket', submitTicket)
router.get('/myTickets', myTickets)
router.post('/setPriority', setPriority)
router.get('/checkLeaveStatus', checkLeaveStatus)
router.get('/getMyLearnings', getMyLearnings)
router.patch('/submitPersonalInfo', submitPersonalInfo)
router.patch('/submitAddress', submitAddress)
router.post("/submitSkills", submitSkills)
router.post('/submitLearningRequest', submitLearningRequest)
router.get('/getEvents', getEvents)
router.get('/getMyskills', getMyskills)
router.get('/getAnnouncements', getAnnouncements)
export default router;
