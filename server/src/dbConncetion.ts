import { Pool } from 'pg';
import 'dotenv/config';

// Database connection
export const pool = new Pool({
  host: process.env.HOST || '',
  user: process.env.USER || '',
  port: Number(process.env.PORT),
  password: process.env.PASSWORD || '',
  database: process.env.DATABASE || '',
})
