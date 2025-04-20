import express from 'express';
import { userLogin, userRegister, userSaveContent } from './user.controller';
import { auth } from '../../middleware';
import middlewareHandler from '../../middleware/expressValidator/validator';

const router = express.Router();

router.post('/register', ...middlewareHandler(['register']), userRegister, userLogin);
router.post('/login', ...middlewareHandler(['login']), userLogin);
router.post('/saveContent', ...middlewareHandler(['auth', 'saveContent']), userSaveContent);

export default router;
