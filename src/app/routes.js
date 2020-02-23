import { Router } from 'express';

import IndexController from './controllers/index-controller';
import UserController from './controllers/user-controller';

import UserValidator from './validators/user-store';

const router = Router();

router.get('/', IndexController.index);
router.post('/users', UserValidator, UserController.store);

module.exports = router;
