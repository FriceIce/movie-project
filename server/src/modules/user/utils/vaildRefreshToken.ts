import { pool, runSql } from '../../../config/database';

/**
 * Checks if a given refresh token is expired.
 *
 * @param {string} oldRefreshToken - The refresh token to validate.
 * @returns {Promise<boolean>} - `true` if the token has expired, `false` if the token is still valid or does not exist.
 */

export async function validRefreshToken(oldRefreshToken: string): Promise<boolean> {
    const token = await runSql<Pick<RefreshTokenTable, 'expires_at' | 'refresh_token'>>(
        pool,
        `SELECT expires_at FROM refresh_tokens WHERE refresh_token = $1`,
        [oldRefreshToken]
    );

    // No match? Return false.
    if (token.length === 0) return false;

    // Set the current date and the expired date.
    const currentDate = new Date();
    const expiresAt = new Date(token[0].expires_at);

    console.log(expiresAt < currentDate ? true : false);
    return expiresAt < currentDate ? true : false;
}
