import express from 'express';

import * as controller from '../controllers/conversations-controller.js';
import { verifyToken } from '../utilities/jwt-token.js';

const router = express.Router();

router.route('/')
    .get(verifyToken, controller.find) 
    .post(verifyToken, controller.post) 

router.route('/:id')
    .put(verifyToken, controller.put) 

router.route('/convo/:id')
    .get(verifyToken, controller.findSingle) 

export default router;