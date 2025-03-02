import express from 'express';
import { login, register } from './user.controller';

const router = express.Router(); 

router.post('/register', register, login);
router.post('/login', login); 

export default router; 