import express from 'express';

import * as controller from '../controllers/users-controllers.js';
import { verifyToken } from '../utilities/jwt-token.js';

const router = express.Router();

router.route('/')
    .get(controller.find)
    .post(controller.post)

router.route('/freelancers')
    .get(controller.getFreelancer)


router.route('/:id')
    .get(controller.get)
    .put(controller.put)
    .delete(verifyToken,controller.remove)

router.route('/login')
    .post(controller.login)

router.route('/data/monthly-data')
    .get(controller.monthlyData)

router.route('/data/user-data')
    .get(controller.userData)

    
export default router;