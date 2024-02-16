import express from 'express';

import * as controller from '../controllers/reviews-controllers.js';
import { verifyToken } from '../utilities/jwt-token.js';

const router = express.Router();

router.route('/')
    .post(verifyToken,controller.post)

router.route('/:id')
    .get(verifyToken,controller.find)
    .put(verifyToken,controller.put)
    .delete(verifyToken,controller.remove)

router.route('/jobs/:jobId')
    .get(verifyToken,controller.findReview)


export default router;