import pg, { QueryResult } from 'pg';
import { consoleLog } from './utils/logger';
import 'dotenv/config';

// Database connection
const { Pool } = pg;
export const pool = new Pool({
    host: process.env.HOST || '',
    user: process.env.USER || '',
    port: Number(process.env.DB_PORT),
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE || '',
});

export async function runSql<T>(
    client: pg.Pool | pg.PoolClient,
    sql: string,
    values?: string[]
): Promise<T[] | undefined> {
    try {
        const result: QueryResult<T[]> = values
            ? await client.query(sql, values)
            : await client.query(sql);
        return result.rows as T[];
    } catch (error) {
        consoleLog('error', String(error));
    }
}
