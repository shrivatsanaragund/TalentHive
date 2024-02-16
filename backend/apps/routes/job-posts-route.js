import express from 'express';

import * as controller from '../controllers/job-posts-controllers.js';
import { verifyToken } from '../utilities/jwt-token.js';

const router = express.Router();

router.route('/')
    .get(controller.find)
    .post(verifyToken,controller.post)

router.route('/:id')
    .get(verifyToken,controller.get)
    .put(verifyToken,controller.put)
    .delete(verifyToken,controller.remove)

    
export default router;