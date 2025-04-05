import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Crear el pool de conexiones a la base de datos
export const pool = createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'employee_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}); 