import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { coloredConsoleLog } from '../../utils/logger';
import 'dotenv/config'

interface Auth extends Request {
  user?: string | jwt.JwtPayload
}

/**
 * @description: Checks if the user is authenticated with a valid token. 
*/

export async function auth(req: Auth, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const JWT_SECRET = process.env.JWT_SECRET_KEY as string; 

  if(!JWT_SECRET) {
    coloredConsoleLog('error', 'JWT_SECRET is undefined!');
    return res.status(500).json({ message: 'Internal server error'});
  }
  
  if(!token) {
    coloredConsoleLog('error', 'Token is undefined');
    return res.status(401).json({ message: 'Access denied! JWT Token is required.'});
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next(); 
  } catch (error) {
    coloredConsoleLog('error', 'JWT verification failed.')

    if(error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Access denied! Invalid JWT token.'});
      }

    res.status(500).json({ message: 'Something went wrong.'}); 
  }
}


