import express from 'express';
import middlewareHandler from '../../middleware/validator';
import {
    userDeleteContent,
    userGuestLogin,
    userLogin,
    userRefreshToken,
    userRegister,
    userRetrieval,
    userRetrieveSavedContent,
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
    ...middlewareHandler(['authentication', 'saveContent']),
    userSaveContent
);
router.delete('/saveContent/:id', ...middlewareHandler(['authentication', 'id']), [
    userDeleteContent,
]);
router.get('/saveContent/', ...middlewareHandler(['authentication']), [userRetrieveSavedContent]);
export default router;
