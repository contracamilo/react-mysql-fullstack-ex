import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employeeRoutes';
import { pool } from './db';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/employees', employeeRoutes);

// Puerto
const PORT = process.env.PORT || 3000;

// Inicializar la base de datos y el servidor
const initializeServer = async () => {
  try {
    // Verificar la conexión a la base de datos
    await pool.query('SELECT 1');
    console.log('Database initialized successfully');

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error initializing the server:', error);
    process.exit(1);
  }
};

initializeServer(); 