import { Request, Response } from 'express'; 
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { coloredConsoleLog } from '../../utils/logger';


/** 
 * @Route /api/register
 * @method POST 
 * @description Checks if the user already exists and if not, creates a new user. 
 * @requestBody {username: string; email: string, password: string}
*/
export async function register(req: Request, res: Response) {
  const { username, email, password } = req.body as RegisterUser; 
  const SECRET_KEY = process.env.JWT_SECRET_KEY as string; 

  try {

    // Hash the password
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds); 

    // Create the access token
    const token = jwt.sign({ email }, SECRET_KEY); 

    res.status(201).json({user: {
      username, 
      email,
      hashedPassword,
      token,
    }})
  } catch (error) {
    coloredConsoleLog('error', error); 
  }
}