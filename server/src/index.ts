import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { consoleLog } from './utils/logger';
import { movieRoutes, userRoutes } from './routes/index';
import 'dotenv/config';
import {
    genres,
    details,
    discovery,
    recommendations,
    topRated,
    popular,
    trending,
    search,
} from './utils/tmbdApi';

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

// discovery('movie', '1', ['with_genres=28']);
// genres('tv');
// details('movie', '950387');
// recommendations('movie', '1396', '1');
// topRated('movie', '1');
// popular('tv', '1');
// trending('movie');
// search('movie', 'man on fire');

// routes
app.use('/api', userRoutes);
app.use('/api', movieRoutes);
app.listen(port, () => {
    consoleLog('highlight', `Server is running on port ${port}`);
});
