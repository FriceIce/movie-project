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
    contentId: {
        notEmpty: notEmptyProperty('The content_id input field is empty.').notEmpty,

        isNumeric: {
            errorMessage: 'The content_id input field must consist of numbers.',
            bail: true,
        },
    },
    contentType: notEmptyProperty('The contentType input field is empty.'),
    images: notEmptyProperty('The image input field is empty.'),
});
