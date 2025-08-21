import { checkSchema } from 'express-validator';
import { CustomError } from '../../../error/errorClasses';

export const typeValidator = checkSchema({
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
        custom: {
            options: (type: AllTypes) => {
                const validParamList: AllTypes[] = ['keyword', 'movie', 'tv', 'multi'];
                if (validParamList.includes(type)) return true;

                throw new CustomError.BadRequestError(`The parameter value is not allowed.`);
            },
        },
    },
});
