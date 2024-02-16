import express from 'express';

import * as controller from '../controllers/category-controller.js';

const router = express.Router();

router.route('/')
    .get(controller.find)
    .post(controller.post)

router.route('/:id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove)

    
export default router;