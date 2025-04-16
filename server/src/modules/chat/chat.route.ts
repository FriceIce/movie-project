import express from 'express';
import { chatbot } from './chat.controller';
import { auth } from '../../middleware';

const router = express.Router();
router.post('/chatbot', chatbot);

export default router;
