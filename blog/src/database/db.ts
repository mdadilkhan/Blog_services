// src/database/db.ts
import { neon } from '@neondatabase/serverless';
import config from '../config';
import logger from '../logger';

let sql: ReturnType<typeof neon>;

const connectDb = async () => {
  try {
    sql = neon(config.dbUrl); // config.dbUrl = `postgresql://user:password@host/dbname`
    // optional: run a test query
    const result = await sql`SELECT 1`;
    logger.info('✅ Connected to Neon PostgreSQL');
  } catch (error) {
    logger.error('❌ Failed to connect to Neon PostgreSQL:', error);
    throw error;
  }
};

export default connectDb;
export { sql };
