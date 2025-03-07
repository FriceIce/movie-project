import { CustomError } from "./error";
import { Request, Response } from "express";

export function errorHandler(error: Error, req: Request, res: Response) {
  if(error instanceof CustomError.EmailError) {
      return res.status(422).json({ message: 'Invalid email' }); 
    }
  
  if(error instanceof CustomError.PasswordError) {
    return res.status(error.statusCode).json({ message: error.message})
  }
} 