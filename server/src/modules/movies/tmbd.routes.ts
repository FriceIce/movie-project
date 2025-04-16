import express from 'express';
import { handleValidationErrors } from '../../middleware/expressValidator/handleValidationError';
import validator from '../../middleware/expressValidator/validator';
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
import { auth } from '../../middleware';

const route = express.Router();

// middleware
route.use(auth);
route.use(handleValidationErrors);

route.get('/genres/:type', ...validator(['type']), [retrieveGenres]);
route.get('/trending/:type', ...validator(['type']), [retrieveTrending]);
route.get('/search/:type', ...validator(['type']), [retrieveSearchResults]);
route.get('/popular/:page/:type', ...validator(['type']), [retrievePopular]);
route.get('/topRated/:page/:type', ...validator(['type']), [retrieveTopRated]);
route.get('/details/:type/:id', ...validator(['type', 'id']), [retrieveDetails]);
route.get('/discovery/:page/:type', ...validator(['type']), [retrieveDiscovery]);
route.get('/recommendations/:page/:type/:id', ...validator(['type', 'id']), [
    retrieveRecommendations,
]);

export default route;
