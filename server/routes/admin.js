import  express from 'express';
import { adminSignin, addAsset, fetchStats, resolveIssue, delayIssue, addProject,addLocation, createCompany} from "../contollers/admin.js"
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

router.get('/createCompany', createCompany)

export default router;
