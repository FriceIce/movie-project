import express from 'express';
import middlewareHandler from '../../middleware/validator';
import {
    retrieveCollection,
    retrieveCredits,
    retrieveDetails,
    retrieveDiscovery,
    retrieveGenres,
    retrievePopular,
    retrieveRecommendations,
    retrieveSearchResults,
    retrieveTopRated,
    retrieveTrending,
    retrieveVideos,
} from './controller/tmdb';

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
route.get('/credits/:type/:id', middlewareHandler(['authentication', 'type', 'id']), [
    retrieveCredits,
]);
route.get('/videos/:type/:id', middlewareHandler(['authentication', 'type', 'id']), [
    retrieveVideos,
]);
route.get('/collection/:id', middlewareHandler(['authentication', 'id']), [retrieveCollection]);

export default route;
