import express from 'express';
import middlewareHandler from '../../middleware/expressValidator/validator';
import { chatbot } from './chat.controller';

const router = express.Router();
router.post('/chatbot', ...middlewareHandler(['auth']), chatbot);

export default router;
