import express from 'express';

import * as controller from '../controllers/messages-controller.js';
import { verifyToken } from '../utilities/jwt-token.js';

const router = express.Router();

router.route('/')
    .post(verifyToken, controller.post)

router.route('/:id')
    .get(verifyToken, controller.find)

export default router;