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
} from './tmbd.controller';

const route = express.Router();

route.get('/genres/:type', typeValidator(), handleValidationErrors, [retrieveGenres]);
route.get('/discovery/:type', typeValidator(), handleValidationErrors, [retrieveDiscovery]);
route.get('/trending/:type', typeValidator(), handleValidationErrors, [retrieveTrending]);
route.get('/details/:type/:id', typeValidator(), handleValidationErrors, [retireveDetails]);
route.get('/recommendations/:type/:id', typeValidator(), handleValidationErrors, [
    retrieveRecommendations,
]);

export default route;
