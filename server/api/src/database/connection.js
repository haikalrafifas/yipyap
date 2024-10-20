import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config({ path: 'server/api/.env' });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default pool;
