import { authentication } from '../jsonwebtoken/authentication';
import { chatValidator } from './chat/chat';
import { handleValidationErrors } from './handleValidationError';
import { idValidator } from './tmbd/id';
import { queryValidator } from './tmbd/query';
import { typeValidator } from './tmbd/type';
import { logInValidator } from './user/logIn';
import { registerValidator } from './user/register';
import { saveContentValidator } from './user/saveContent';

/**
 * Dynamically composes middleware based on the provided validator keys.
 *
 * This function maps the validators value, which can include names like ('auth', 'type', 'id').
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

    if (middleware.has('auth')) validatorList.unshift(authentication);
    validatorList.push(handleValidationErrors);

    return validatorList;
}
