import express from 'express';
import { userLogin, userRegister } from './user.controller';

const router = express.Router();

router.post('/register', userRegister, userLogin);
router.post('/login', userLogin);

export default router;
