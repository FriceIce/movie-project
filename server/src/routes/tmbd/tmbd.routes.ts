import express from 'express';
import { handleValidationErrors } from '../../middleware/expressValidator/handleValidationError';
import validator from '../../middleware/expressValidator/validator';
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

const route = express.Router();

// middleware
route.use(handleValidationErrors);

route.get('/genres/:type', ...validator(['type']), [retrieveGenres]);
route.get('/discovery/:type', ...validator(['type']), [retrieveDiscovery]);
route.get('/trending/:type', ...validator(['type']), [retrieveTrending]);
route.get('/search/:type', ...validator(['type']), [retrieveSearchResults]);
route.get('/popular/:type', ...validator(['type']), [retirevePopular]);
route.get('/topRated/:type', ...validator(['type']), [retrieveTopRated]);
route.get('/details/:type/:id', ...validator(['type', 'id']), [retireveDetails]);
route.get('/recommendations/:type/:id', ...validator(['type', 'id']), handleValidationErrors, [
    retrieveRecommendations,
]);

export default route;
