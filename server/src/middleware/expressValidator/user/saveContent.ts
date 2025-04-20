import { checkSchema } from 'express-validator';

function notEmptyProperty(errorMsg: string) {
    return {
        notEmpty: {
            errorMessage: errorMsg,
            bail: true,
        },
    };
}

export const saveContentValidator = checkSchema({
    content_id: {
        notEmpty: notEmptyProperty('The content_id input field is empty.').notEmpty,

        isNumeric: {
            errorMessage: 'The content_id input field must consist of numbers.',
            bail: true,
        },
    },
    title: notEmptyProperty('The title input field is empty.'),
    description: notEmptyProperty('The description input field is empty.'),
    image: notEmptyProperty('The image input field is empty.'),
});
