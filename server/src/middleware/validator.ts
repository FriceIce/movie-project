import { authentication } from './auth/authentication';
import { authorization } from './auth/authorization';
import { chatValidator } from './expressValidator/chat/chat';
import { handleValidationErrors } from './expressValidator/handleValidationError';
import { idValidator } from './expressValidator/tmdb/id';
import { queryValidator } from './expressValidator/tmdb/query';
import { typeValidator } from './expressValidator/tmdb/type';
import { logInValidator } from './expressValidator/user/logIn';
import { registerValidator } from './expressValidator/user/register';
import { saveContentValidator } from './expressValidator/user/saveContent';

/**
 * Dynamically composes middleware based on the provided validator keys.
 *
 * This function maps the validators value, which can include names like ('authentication', 'type', 'id', 'query') etc.
 * In situations where the 'type' or 'id' names includes in the validators value there respective middleware function will be used in the route handler.
 *
 * - 'auth' middleware is added to the beginning (if included).
 * - `handleValidationErrors` is always appended at the end.
 *
 * @param {Validator[]} validators List of validators needed
 * @returns a list of validators
 */

export default function middlewareHandler(validators: Validator[]) {
    const validatorList: ValidatorFunc[] = [];
    const middleware: Set<Validator> = new Set(validators);

    validators.forEach((value) => {
        if (value === 'id') return validatorList.push(idValidator);
        if (value === 'type') return validatorList.push(typeValidator);
        if (value === 'query') return validatorList.push(queryValidator);
        if (value === 'saveContent') return validatorList.push(saveContentValidator);
        if (value === 'register') return validatorList.push(registerValidator);
        if (value === 'login') return validatorList.push(logInValidator);
        if (value === 'chat') return validatorList.push(chatValidator);
    });

    // Checks for authentication and authorization using middleware. The authentication middleware is placed first in the route chain.
    if (middleware.has('authorization')) validatorList.unshift(authorization);
    if (middleware.has('authentication')) validatorList.unshift(authentication);

    validatorList.push(handleValidationErrors);

    return validatorList;
}
