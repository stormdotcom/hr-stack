import  express from 'express';
import { signin, createUser, logout, fetchEmployeData, timeInStats, timeOutStats, getEvents, getHoliday, leaveDecline, submitPersonalInfo,
       submitAddress, submitSkills, getMyskills, getAnnouncements, submitProfilePhoto, submitAssetReq, getMyassets, submitCabRequest,
       checkCabStatus, myCabs, submitSeperation, getSeperationInfo, submitTransfer,  getTransferInfo, getPerformer, getNotification,
        leaveApprove, submitTicket, allActiveTicket, myTickets, setPriority, checkLeaveStatus, submitLearningRequest, getMyLearnings,
        submitLeave, getTimeSheet, setTimeIn, setTimeOut, getLeaveRequest} from "../contollers/employee.js"
import {getAssetRequest} from "../contollers/admin.js"
import {getMonth} from "../contollers/hr.js"
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("api live");
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
router.patch('/submitProfilePhoto', submitProfilePhoto)
router.post("/submitAssetReq", submitAssetReq)
router.get('/getMyassets', getMyassets)
router.get('/getAssetRequest', getAssetRequest)
router.post("/submitCabRequest", submitCabRequest)
router.get('/checkCabStatus', checkCabStatus)
router.get('/myCabs', myCabs)
router.post("/submitSeperation", submitSeperation)
router.get('/getSeperationInfo', getSeperationInfo)
router.post("/submitTransfer", submitTransfer)
router.get('/getTransferInfo', getTransferInfo)
router.get('/getPerformer', getPerformer)
router.get('/getMonths', getMonth)
router.get('/getNotification', getNotification)


export default router;
