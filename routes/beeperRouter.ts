import express, { Router } from 'express';
import {GetBeepers, AddBeeper} from '../controllers/beepController.js' 
import {middle1} from '../middleWares/middle1.js'

const router: Router = express.Router();

//router.route('/').get().post(AddBook);

router.route('/').post(AddBeeper).get(GetBeepers);

export default router;