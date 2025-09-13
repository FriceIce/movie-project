import { Pool } from 'pg';
import { runSql } from '../../../config/database';

export async function retrieveOldRefreshToken(pool: Pool, id: string) {
    const tokenObj = await runSql<Pick<RefreshTokenTable, 'expires_at' | 'refresh_token'>>(
        pool,
        `SELECT expires_at, refresh_token FROM refresh_tokens WHERE user_id = $1`,
        [id]
    );
    console.log('refresh token from db:', tokenObj);
    return tokenObj.length === 0 ? false : true;
}
