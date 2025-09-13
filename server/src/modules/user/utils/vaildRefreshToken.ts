import { pool, runSql } from '../../../config/database';

/**
 * Checks if a given refresh token is expired.
 *
 * @param {string} oldRefreshToken - The refresh token to validate.
 * @returns {Promise<boolean>} - `true` if the token has expired, `false` if the token is still valid or does not exist.
 */

export async function validRefreshToken(
    oldRefreshToken: string
): Promise<{ oldTokenExists: boolean; expired: boolean }> {
    console.log('old refresh token', oldRefreshToken);
    const tokenObj = await runSql<Pick<RefreshTokenTable, 'expires_at' | 'refresh_token'>>(
        pool,
        `SELECT expires_at, refresh_token FROM refresh_tokens WHERE refresh_token = $1`,
        [oldRefreshToken]
    );

    console.log('refresh token from db:', tokenObj);

    // No match? Return false.
    if (tokenObj.length === 0) return { oldTokenExists: false, expired: false };

    // Set the current date and the expired date.
    const currentDate = new Date();
    const expiresAt = new Date(tokenObj[0].expires_at);

    // console.log(expiresAt < currentDate ? true : false);
    return {
        oldTokenExists: true,
        expired: expiresAt < currentDate ? true : false,
    };
}
