import  express from 'express';
import { adminSignin, addAsset, fetchStats} from "../contollers/admin.js"
import { auth } from '../middleware/auth.js';
const router = express.Router();

/* GET home page. */
router.post('/signin', adminSignin);
// router.post('/createUser', createAdmin);
router.post('/addAsset', addAsset);
router.get('/fetchStats', fetchStats);
export default router;
