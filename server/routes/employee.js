import  express from 'express';
import { signin, createUser, logout, fetchEmployeData, timeInStats, timeOutStats, getEvents, getHoliday, leaveDecline,
        leaveApprove,
        submitLeave, getTimeSheet, setTimeIn, setTimeOut, getLeaveRequest} from "../contollers/employee.js"
const router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
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
router.get('/getEvents', getEvents)
router.get('/getHoliday', getHoliday)
router.post('/submitLeave', submitLeave)
router.get('/getLeaveRequest', getLeaveRequest)
router.post('/leaveApprove', leaveApprove)
router.post('/leaveDecline', leaveDecline)

export default router;
