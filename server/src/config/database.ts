import 'dotenv/config';
import pg, { QueryResult } from 'pg';
import { CustomError } from '../utils/error/error';

// Database connection
const { Pool } = pg;

export const pool = new Pool({
    host: process.env.HOST || '',
    user: process.env.USER || '',
    port: Number(process.env.DB_PORT),
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE || '',
});
pool.on('connect', () => console.log('Database connection established'));
pool.on('release', () => console.log('Database connection released'));

export async function runSql<T>(
    client: pg.Pool | pg.PoolClient,
    sql: string,
    values?: any[]
): Promise<T[] | undefined> {
    try {
        const result: QueryResult<T[]> = values
            ? await client.query(sql, values)
            : await client.query(sql);
        return result.rows as T[];
    } catch (error: any) {
        console.error(error.message);
        throw new CustomError.PostgreSQLError(error.message, error.code);
    }
}
