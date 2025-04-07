import { checkSchema } from 'express-validator';

export default function idValidator() {
    return checkSchema({
        id: {
            in: 'params',
            notEmpty: {
                errorMessage: 'ID parameter is required',
                bail: true,
            },
            isNumeric: {
                errorMessage: 'ID parameter must be a number',
                bail: true,
            },
            custom: {
                options: (value) => value >= 1,
                errorMessage: 'ID parameter must be greater than or equal to 1',
            },
        },
    });
}
