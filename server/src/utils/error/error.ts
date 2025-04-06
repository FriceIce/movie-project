import { StatusCode } from './statusCodes';

// Custom error classes for handling specific error scenarios
export namespace CustomError {
    export class PasswordError extends Error {
        statusCode: number;

        constructor(message: string, statusCode?: number) {
            super(message);
            this.statusCode = statusCode || StatusCode.BAD_REQUEST;
            this.name = 'PasswordError';
        }
    }

    export class EmailError extends Error {
        statusCode: number;

        constructor(message: string, statusCode?: number) {
            super(message);
            this.statusCode = statusCode || StatusCode.UNPROCESSABLE_ENTITY;
            this.name = 'EmailError';
        }
    }

    export class NotFoundError extends Error {
        statusCode: number;

        constructor(message: string, statusCode?: number) {
            super(message);
            this.statusCode = statusCode || StatusCode.NOT_FOUND;
            this.name = 'NotFoundError';
        }
    }

    export class BadRequestError extends Error {
        statusCode: number;

        constructor(message: string, statusCode?: number) {
            super(message);
            this.statusCode = statusCode || StatusCode.BAD_REQUEST;
            this.name = 'BadRequestError';
        }
    }
}
