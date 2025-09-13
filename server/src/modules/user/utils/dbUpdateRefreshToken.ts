import { Pool } from 'pg';
import { runSql } from '../../../config/database';

export async function dbUpdateRefreshToken(
    pool: Pool,
    oldTokenExists: boolean,
    newRefreshToken: string,
    id: string
) {
    if (oldTokenExists) {
        await runSql(pool, `UPDATE refresh_tokens SET refresh_token = $1 WHERE user_id = $2;`, [
            newRefreshToken,
            id,
        ]);
    } else {
        await runSql(pool, `INSERT INTO refresh_tokens (user_id, refresh_token) VALUES($1, $2);`, [
            id,
            newRefreshToken,
        ]);
    }
}
