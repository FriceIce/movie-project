import express from 'express';
import { handleValidationErrors } from '../../middleware/expressValidator/handleValidationError';
import {
    retireveDetails,
    retirevePopular,
    retrieveDiscovery,
    retrieveGenres,
    retrieveRecommendations,
    retrieveSearchResults,
    retrieveTopRated,
    retrieveTrending,
} from './tmbd.controller';
import validator from '../../middleware/expressValidator/validator';

const route = express.Router();

route.get('/genres/:type', ...validator(['type']), handleValidationErrors, [retrieveGenres]);
route.get('/discovery/:type', ...validator(['type']), handleValidationErrors, [retrieveDiscovery]);
route.get('/trending/:type', ...validator(['type']), handleValidationErrors, [retrieveTrending]);
route.get('/search/:type', ...validator(['type']), handleValidationErrors, [retrieveSearchResults]);
route.get('/popular/:type', ...validator(['type']), handleValidationErrors, [retirevePopular]);
route.get('/topRated/:type', ...validator(['type']), handleValidationErrors, [retrieveTopRated]);
route.get('/details/:type/:id', ...validator(['type', 'id']), handleValidationErrors, [
    retireveDetails,
]);
route.get('/recommendations/:type/:id', ...validator(['type', 'id']), handleValidationErrors, [
    retrieveRecommendations,
]);

export default route;
