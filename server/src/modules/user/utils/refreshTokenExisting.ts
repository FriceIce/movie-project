import { pool, runSql } from '../../../config/database';

/**
 * Checks if a refresh token exists for a given user and inserts or updates it in the database.
 *
 * @param {number} id - The user ID for which to check the refresh token.
 * @param {string} refreshToken - The refresh token to store or update in the database.
 * @returns {Promise<void>} - A promise that resolves once the token has been inserted or updated.
 */

export async function refreshTokenExists(id: number, refreshToken: string): Promise<void> {
    const tokenExisting = await runSql<RefreshTokenTable>(
        pool,
        `SELECT user_id FROM refresh_tokens WHERE user_id = $1`,
        [id]
    );

    if (tokenExisting.length === 0) {
        // Stores the refresh token in the database
        await runSql(pool, 'INSERT INTO refresh_tokens(user_id, refresh_token) VALUES($1, $2);', [
            id,
            refreshToken,
        ]);
    } else {
        // Updates the refresh token in the database
        await runSql(
            pool,
            `UPDATE refresh_tokens SET refresh_token = $1, created_at = NOW(), expires_at = NOW() + INTERVAL '7 days' WHERE user_id = $2;`,
            [refreshToken, id]
        );
    }
}
