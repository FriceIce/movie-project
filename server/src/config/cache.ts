import NodeCache from 'node-cache';
export const cache = new NodeCache({ stdTTL: 3600 }); // cache lifetime is 1 hour
