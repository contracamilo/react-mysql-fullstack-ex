import axios from 'axios';
import { Employee } from '../types/Employee';

const API_URL = 'http://localhost:3000/api/employees';

// Obtener todos los empleados
export const getEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Obtener un empleado por ID
export const getEmployee = async (id: number): Promise<Employee> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Crear un nuevo empleado
export const createEmployee = async (employee: Omit<Employee, 'id'>): Promise<Employee> => {
  const response = await axios.post(API_URL, employee);
  return response.data;
};

// Actualizar un empleado existente
export const updateEmployee = async (id: number, employee: Partial<Employee>): Promise<Employee> => {
  const response = await axios.put(`${API_URL}/${id}`, employee);
  return response.data;
};

// Eliminar un empleado
export const deleteEmployee = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
}; 