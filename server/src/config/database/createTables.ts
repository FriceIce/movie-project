import { Pool } from 'pg';
import { pool } from '../database';

async function createTables(pool: Pool) {
    const createTablesSQL = `
  CREATE TABLE IF NOT EXISTS saved_content (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      content_id INTEGER NOT NULL,
      content_type TEXT NOT NULL,
      poster_path TEXT NOT NULL,
      backdrop_path TEXT NOT NULL,
      created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
      title TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
      password TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS refresh_tokens (
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      refresh_token TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now(),
      expires_at TIMESTAMPTZ DEFAULT (now() + INTERVAL '7 days') NOT NULL
  );
  `;

    try {
        await pool.query('BEGIN');
        await pool.query(createTablesSQL);
        await pool.query('COMMIT');
        console.log('Tables created successfully');
    } catch (err) {
        await pool.query('ROLLBACK');
        console.error('Error creating tables:', err);
    } finally {
        await pool.end();
    }
}

createTables(pool);
