import { checkSchema } from 'express-validator';

export default function typeValidator() {
    return checkSchema({
        type: {
            in: 'params',
            notEmpty: {
                errorMessage: 'Type parameter is required',
                bail: true,
            },
            isLowercase: {
                errorMessage: 'Type parameter must be lowercase',
                bail: true,
            },
        },
    });
}
