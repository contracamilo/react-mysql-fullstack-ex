import { Request, Response } from 'express';
import { pool } from '../db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// Interfaz para el tipo Employee en el backend
interface Employee extends RowDataPacket {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  createdAt: Date;
  updatedAt: Date;
}

// Obtener todos los empleados
export const getEmployees = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<Employee[]>('SELECT * FROM employees');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    res.status(500).json({ message: 'Error al obtener los empleados' });
  }
};

// Obtener un empleado por ID
export const getEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query<Employee[]>('SELECT * FROM employees WHERE id = ?', [id]);
    
    if (rows.length <= 0) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener empleado:', error);
    res.status(500).json({ message: 'Error al obtener el empleado' });
  }
};

// Crear un nuevo empleado
export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, department } = req.body;
    
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO employees (firstName, lastName, email, phone, department) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, phone, department]
    );
    
    if (result.affectedRows <= 0) {
      return res.status(400).json({ message: 'Error al crear el empleado' });
    }
    
    const [rows] = await pool.query<Employee[]>('SELECT * FROM employees WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error al crear empleado:', error);
    res.status(500).json({ message: 'Error al crear el empleado' });
  }
};

// Actualizar un empleado existente
export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phone, department } = req.body;
    
    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE employees SET firstName = ?, lastName = ?, email = ?, phone = ?, department = ? WHERE id = ?',
      [firstName, lastName, email, phone, department, id]
    );
    
    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    
    const [rows] = await pool.query<Employee[]>('SELECT * FROM employees WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al actualizar empleado:', error);
    res.status(500).json({ message: 'Error al actualizar el empleado' });
  }
};

// Eliminar un empleado
export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM employees WHERE id = ?', [id]);
    
    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar empleado:', error);
    res.status(500).json({ message: 'Error al eliminar el empleado' });
  }
}; 