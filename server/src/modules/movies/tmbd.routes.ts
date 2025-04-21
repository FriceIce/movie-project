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

route.get('/genres/:type', ...middlewareHandler(['authentication', 'type']), [retrieveGenres]);
route.get('/trending/:type', ...middlewareHandler(['authentication', 'type']), [retrieveTrending]);
route.get('/popular/:page/:type', ...middlewareHandler(['authentication', 'type']), [
    retrievePopular,
]);
route.get('/topRated/:page/:type', ...middlewareHandler(['authentication', 'type']), [
    retrieveTopRated,
]);
route.get('/details/:type/:id', ...middlewareHandler(['authentication', 'type', 'id']), [
    retrieveDetails,
]);
route.get('/discovery/:page/:type', ...middlewareHandler(['authentication', 'type']), [
    retrieveDiscovery,
]);
route.get('/search/:type', ...middlewareHandler(['authentication', 'type', 'query']), [
    retrieveSearchResults,
]);
route.get(
    '/recommendations/:page/:type/:id',
    ...middlewareHandler(['authentication', 'type', 'id']),
    [retrieveRecommendations]
);

export default route;
