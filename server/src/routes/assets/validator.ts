import { ValidationChain } from 'express-validator';
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema';
import idValidator from '../../middleware/expressValidator/tmbd/id';
import { typeValidator } from '../../middleware/expressValidator';

/**
 * This function dynamically picks the validator needed for set route.
 * @param {Validator[]} validators List of validators needed
 * @returns a list of validators
 */
export default function validator(validators: Validator[]) {
    const validatorList: RunnableValidationChains<ValidationChain>[] = [];

    validators.forEach((value) => {
        if (value === 'id') return validatorList.push(idValidator());
        if (value === 'type') return validatorList.push(typeValidator());
    });

    return validatorList;
}
