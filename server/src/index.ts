import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { movieRoutes, openaiRoutes, userRoutes } from './modules';
import { consoleLog } from './utils/logger';

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
app.use('/api', openaiRoutes);

app.listen(port, () => {
    consoleLog('highlight', `Server is running on port ${port}`);
});
