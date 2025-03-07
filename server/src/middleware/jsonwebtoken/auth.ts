import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { consoleLog } from '../../utils/logger';
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
    throw new Error('JWT_SECRET is undefined!')
  }
  
  if(!token) {
    consoleLog('error', 'Token is undefined');
    throw new Error('Access denied! JWT token is required.')
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next(); 

  } catch (error) {
    if (error instanceof Error) {
      consoleLog('error', 'Something failed: ' + error.message)
    }

    if(error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Access denied! Invalid JWT token.'});
    } 

    if(error instanceof jwt.TokenExpiredError) {
      return res.status(403).json({ message: 'Access denied! JWT token expired.'});
    }

    res.status(500).json({ message: 'Internal server error.'}); 
  }
}


