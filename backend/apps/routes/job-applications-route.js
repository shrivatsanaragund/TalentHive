import express from 'express';

import * as controller from '../controllers/job-applications-controllers.js';
import { verifyToken } from '../utilities/jwt-token.js';

const router = express.Router();

router.route('/')
    .get(verifyToken,controller.find)
    .put(verifyToken, controller.confirmPayment);

router.route('/:id')
    .get(verifyToken,controller.get)
    .put(verifyToken,controller.put)
    .delete(verifyToken,controller.remove)

router.route('/create-payment-intent/:jobId')
    .post(verifyToken,controller.post)
    
export default router;