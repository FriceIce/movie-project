import { checkSchema } from 'express-validator';

export const logInValidator = checkSchema({
    email: {
        in: 'body',
        isEmail: {
            errorMessage: (email: any) => `${email} --> is not valid email format.`,
            bail: true,
        },
        notEmpty: {
            errorMessage: 'The email input field is empty.',
            bail: true,
        },
    },

    password: {
        in: 'body',
        notEmpty: {
            errorMessage: 'The password input field is empty.',
            bail: true,
        },

        isLength: {
            options: {
                min: 6,
            },
            errorMessage: 'Password must be atleast 6 characters',
            bail: true,
        },

        matches: {
            options: /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/,
            errorMessage: 'Password must contain at least one number and one special character',
        },
    },
});
