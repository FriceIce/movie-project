import express from 'express';
import { handleValidationErrors } from '../../middleware/expressValidator/handleValidationError';
import middlewareHandler from '../../middleware/expressValidator/validator';
import {
    retrieveDetails,
    retrievePopular,
    retrieveDiscovery,
    retrieveGenres,
    retrieveRecommendations,
    retrieveSearchResults,
    retrieveTopRated,
    retrieveTrending,
} from './controller/tmbd';

const route = express.Router();

route.get('/genres/:type', ...middlewareHandler(['auth', 'type']), [retrieveGenres]);
route.get('/trending/:type', ...middlewareHandler(['auth', 'type']), [retrieveTrending]);
route.get('/popular/:page/:type', ...middlewareHandler(['auth', 'type']), [retrievePopular]);
route.get('/topRated/:page/:type', ...middlewareHandler(['auth', 'type']), [retrieveTopRated]);
route.get('/details/:type/:id', ...middlewareHandler(['auth', 'type', 'id']), [retrieveDetails]);
route.get('/discovery/:page/:type', ...middlewareHandler(['auth', 'type']), [retrieveDiscovery]);
route.get('/search/:type', ...middlewareHandler(['auth', 'type', 'query']), [
    retrieveSearchResults,
]);
route.get('/recommendations/:page/:type/:id', ...middlewareHandler(['auth', 'type', 'id']), [
    retrieveRecommendations,
]);

export default route;
