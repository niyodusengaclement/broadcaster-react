import { Pool } from 'pg';
import dotenv from 'dotenv';
import queries from './queries';

dotenv.config();

const pool = new Pool({ connectionString: process.env.TEST_DB_URL });

pool.on('connect', () => {
  console.log('Database connected');
});

const createUsersTables = async () => {
  try {
    await pool.query(queries.users);
  } catch (err) {
    console.log(err);
  }
};
const createReportsTables = async () => {
  try {
    await pool.query(queries.report);
  } catch (err) {
    console.log(err);
  }
};

pool.on('remove', () => {
  console.log('Connection terminated');
  process.exit(0);
});

module.exports = {
  createUsersTables,
  createReportsTables,
};

require('make-runnable');
