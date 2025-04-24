import { checkSchema } from 'express-validator';

export const queryValidator = checkSchema({
    query: {
        in: 'query',
        notEmpty: {
            errorMessage: 'The query string is empty.',
            bail: true,
        },
    },
});
