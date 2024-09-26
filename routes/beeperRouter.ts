import express, { Router } from 'express';
import {GetBeepers, AddBeeper, GetByStatus, GetSpecificBeeper, UpdateStatus, DeleteBeeper} from '../controllers/beepController.js' 

const router: Router = express.Router();


router.route('/:id').delete(DeleteBeeper).get(GetSpecificBeeper);

router.route('/').post(AddBeeper).get(GetBeepers);

router.route('/:id/status').put(UpdateStatus);

router.route('/status/:status').get(GetByStatus);


export default router;