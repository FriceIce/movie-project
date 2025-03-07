
export namespace CustomError {
  export class PasswordError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.name = 'PasswordError';  
    }
  }

  export class EmailError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = 422;
      this.name = 'EmailError';
      this.statusCode = statusCode;
    }
  }
}