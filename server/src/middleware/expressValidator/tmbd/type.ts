import { checkSchema } from 'express-validator';
import { CustomError } from '../../../utils/error/errorClasses';

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
            custom: {
                options: (type: Type) => {
                    const validParamList: Type[] = ['keyword', 'movie', 'tv'];
                    if (validParamList.includes(type)) return true;

                    throw new CustomError.BadRequestError(`The parameter value is not allowed.`);
                },
            },
        },
    });
}
