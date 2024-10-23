import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config({ path: 'server/api/.env' });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

pool.on('connect', async (client) => {
  try {
    const schema = process.env.POSTGRES_SCHEMA || 'public';
    await client.query(`SET search_path TO ${schema}`);
  } catch (error) {
    console.error("Error setting search path:", error);
  }
});

export default pool;
