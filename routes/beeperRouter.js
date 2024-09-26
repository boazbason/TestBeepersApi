import express from 'express';
import { GetBeepers, AddBeeper } from '../controllers/beepController.js';
const router = express.Router();
//router.route('/').get().post(AddBook);
router.route('/').post(AddBeeper).get(GetBeepers);
export default router;
