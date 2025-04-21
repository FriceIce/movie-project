import express from 'express';
import middlewareHandler from '../../middleware/expressValidator/validator';
import { userGuestLogin, userLogin, userRegister, userSaveContent } from './user.controller';

const router = express.Router();

router.post('/register', ...middlewareHandler(['register']), [userRegister, userLogin]);
router.post('/login', ...middlewareHandler(['login']), [userLogin]);
router.post('/guestLogin', [userGuestLogin]);
router.post(
    '/saveContent',
    ...middlewareHandler(['authentication', 'authorization', 'saveContent']),
    userSaveContent
);

export default router;
