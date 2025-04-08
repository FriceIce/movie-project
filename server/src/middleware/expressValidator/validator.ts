import { typeValidator } from '.';
import idValidator from './tmbd/id';

/**
 * This function dynamically picks the validator needed for set route.
 * @param {Validator[]} validators List of validators needed
 * @returns a list of validators
 */

export default function validator(validators: Validator[]) {
    const validatorList: ValidatorFunc[] = [];

    validators.forEach((value) => {
        if (value === 'id') return validatorList.push(idValidator());
        if (value === 'type') return validatorList.push(typeValidator());
    });

    return validatorList;
}
