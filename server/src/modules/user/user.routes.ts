import express from 'express';
import { userLogin, userRegister, userSaveContent } from './user.controller';
import { auth } from '../../middleware';

const router = express.Router();

router.post('/register', userRegister, userLogin);
router.post('/login', userLogin);
router.post('/saveContent', auth, userSaveContent);

export default router;
