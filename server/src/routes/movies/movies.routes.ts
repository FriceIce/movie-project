import express from 'express';
import { retrieveGenres } from './movies.controller';

const route = express.Router();

route.get('/genres/:type', retrieveGenres);

export default route;
