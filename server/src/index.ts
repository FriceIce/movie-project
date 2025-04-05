import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { consoleLog } from './utils/logger';
import { userRoutes } from './routes/index';
import 'dotenv/config';
import { discovery } from './utils/tmbdEndpoints/discovery';
import { genres } from './utils/tmbdEndpoints/genres/genres';

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

// const movies = discovery('movie', ['with_genres=28'])
// const genresList = genres('tv');

// routes
app.use('/api', userRoutes);
app.listen(port, () => {
    consoleLog('highlight', `Server is running on port ${port}`);
});
