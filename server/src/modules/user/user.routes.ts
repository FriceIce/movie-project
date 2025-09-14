import express from 'express';
import middlewareHandler from '../../middleware/validator';
import {
    userGuestLogin,
    userLogin,
    userRefreshToken,
    userRegister,
    userRetrieval,
    userSaveContent,
} from './user.controller';

const router = express.Router();

router.post('/register', ...middlewareHandler(['register']), [userRegister, userLogin]);
router.post('/login', ...middlewareHandler(['login']), [userLogin]);
router.get('/me', ...middlewareHandler(['authentication']), [userRetrieval]);
router.post('/guestLogin', [userGuestLogin]);
router.post('/refresh', [userRefreshToken]);
router.post(
    '/saveContent',
    ...middlewareHandler(['authentication', 'authorization', 'saveContent']),
    userSaveContent
);
export default router;
