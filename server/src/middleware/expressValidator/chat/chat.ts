import { checkSchema } from 'express-validator';

export const chatValidator = checkSchema({
    'userInput.role': {
        isIn: {
            options: [['user', 'system', 'assistant']],
            errorMessage: 'userInput.role must be one of: user, system, assistant',
        },
    },
    'userInput.content': {
        isString: {
            errorMessage: 'userInput.content must be a string',
        },
        notEmpty: {
            errorMessage: 'userInput.content cannot be empty',
        },
    },
    chatHistory: {
        isArray: {
            errorMessage: 'chatHistory must be an array',
        },
    },
    'chatHistory.*.role': {
        isIn: {
            options: [['user', 'system', 'assistant']],
            errorMessage: 'Each chatHistory item role must be one of: user, system, assistant',
        },
    },
    'chatHistory.*.content': {
        isString: {
            errorMessage: 'Each chatHistory item content must be a string',
        },
        notEmpty: {
            errorMessage: 'Each chatHistory item content cannot be empty',
        },
    },
});
