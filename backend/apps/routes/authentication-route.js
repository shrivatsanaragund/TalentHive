import express from 'express';

import * as controller from '../controllers/authentication-controllers.js';

const router = express.Router();

router.route('/register')
    .post(controller.register)

router.route('/login')
    .post(controller.login)

router.route('/logout')
    .post(controller.logout)

router.route('/activate/:token')
    .get(controller.activate)


    
export default router;