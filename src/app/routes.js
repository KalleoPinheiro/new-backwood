import { Router } from 'express';

import IndexController from './controllers/index-controller';
import UserController from './controllers/user-controller';
import SessionController from './controllers/session-controller';

import UserStoreValidator from './validators/user-store';
import UserUpdateValidator from './validators/user-update';
import SessionValidator from './validators/session-store';

import authMiddleware from './middlewares/auth';

const router = Router();

router.get('/', IndexController.index);
router.post('/session', SessionValidator, SessionController.store);
router.post('/users', UserStoreValidator, UserController.store);

router.use(authMiddleware);
router.put('/users', UserUpdateValidator, UserController.update);

module.exports = router;
