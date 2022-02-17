import  express from 'express';
import { adminSignin, addAsset, fetchStats, resolveIssue, delayIssue,  getAllAssets, setAsset, getAllAssetsHolding, addHolidays,
    returnAsset, declineAssetReq, getAllEmployeesList,blockUser, unBlockUser, deleteUser, addMonths, updatePassword, updateAsset,
    addProject,addLocation, createCompany, getAssetRequest} from "../contollers/admin.js"
const router = express.Router();

/* GET home page. */
router.post('/signin', adminSignin);
// router.post('/createUser', createAdmin);
router.post('/addAsset', addAsset);
router.get('/fetchStats', fetchStats);
router.post('/resolveIssue', resolveIssue)
router.post('/delayIssue', delayIssue)
router.post('/addProject', addProject)
router.post('/addLocation', addLocation)
router.get('/getAssetRequest', getAssetRequest);
router.get('/createCompany', createCompany)
router.get('/getAllAssets', getAllAssets)
router.post('/setAsset', setAsset)
router.get('/getAllAssetsHolding', getAllAssetsHolding)
router.get('/returnAsset', returnAsset)
router.post('/declineAssetReq', declineAssetReq)
router.get('/getAllEmployees', getAllEmployeesList)
router.get('/blockUser', blockUser)
router.get('/unBlockUser', unBlockUser)
router.get('/deleteUser', deleteUser)
router.post('/add-month', addMonths)
router.post('/addHolidays', addHolidays)
router.post('/updatePassword', updatePassword)
router.post('/updateAsset', updateAsset)
export default router;
