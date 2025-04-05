// Interfaz que define la estructura de un empleado
export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateEmployeeInput {
  name: string;
  age: number;
  country: string;
  position: string;
  years: number;
}

export interface UpdateEmployeeInput extends Partial<CreateEmployeeInput> {} 