import express from 'express';
import middlewareHandler from '../../middleware/validator';
import { chatbot } from './chat.controller';

const router = express.Router();
router.post('/chatbot', ...middlewareHandler(['authentication']), chatbot);

export default router;
