import express from 'express';
import { typeValidator } from '../../middleware/expressValidator/index';
import { handleValidationErrors } from '../../middleware/expressValidator/handleValidationError';

// controller functions
import {
    retrieveGenres,
    retrieveDiscovery,
    retrieveTrending,
    retireveDetails,
    retrieveRecommendations,
    retrieveSearchResults,
    retirevePopular,
    retrieveTopRated,
} from './tmbd.controller';
import idValidator from '../../middleware/expressValidator/tmbd/id';

const route = express.Router();

route.get('/genres/:type', typeValidator(), handleValidationErrors, [retrieveGenres]);
route.get('/discovery/:type', typeValidator(), handleValidationErrors, [retrieveDiscovery]);
route.get('/trending/:type', typeValidator(), handleValidationErrors, [retrieveTrending]);
route.get('/details/:type/:id', typeValidator(), idValidator(), handleValidationErrors, [
    retireveDetails,
]);
route.get('/recommendations/:type/:id', typeValidator(), idValidator(), handleValidationErrors, [
    retrieveRecommendations,
]);
route.get('/search/:type', typeValidator(), handleValidationErrors, [retrieveSearchResults]);
route.get('/popular/:type', typeValidator(), handleValidationErrors, [retirevePopular]);
route.get('/topRated/:type', typeValidator(), handleValidationErrors, [retrieveTopRated]);

export default route;
