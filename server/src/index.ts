import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { movieRoutes, userRoutes } from './routes/index';
import { consoleLog } from './utils/logger';
import { chat } from './utils/api/openai/chat';

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

// routes
app.use('/api', userRoutes);
app.use('/api', movieRoutes);

// const arr: ChatHistory[] = [
//     {
//         role: 'user',
//         content: 'Vem jobbar du för?',
//     },
//     {
//         role: 'system',
//         content:
//             "Hi there! How can I assist you with finding the perfect Netflix movie today? Whether you're in a specific mood or have a particular genre in mind, I'm here to help with recommendations.",
//     },
// ];

chat('Jag är på ett dåligt humör, vilka genre rekommenderar du?', []);

app.listen(port, () => {
    consoleLog('highlight', `Server is running on port ${port}`);
});
