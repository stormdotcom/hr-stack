import  express from 'express';
import { adminSignin, addAsset, fetchStats, resolveIssue, delayIssue} from "../contollers/admin.js"
const router = express.Router();

/* GET home page. */
router.post('/signin', adminSignin);
// router.post('/createUser', createAdmin);
router.post('/addAsset', addAsset);
router.get('/fetchStats', fetchStats);
router.post('/resolveIssue', resolveIssue)
router.post('/delayIssue', delayIssue)
export default router;
