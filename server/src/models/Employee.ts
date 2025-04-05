import { z } from 'zod';

export const EmployeeSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
  age: z.number().min(18, 'Age must be at least 18'),
  country: z.string().min(1, 'Country is required'),
  position: z.string().min(1, 'Position is required'),
  years: z.number().min(0, 'Years must be non-negative'),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export type Employee = z.infer<typeof EmployeeSchema>;

export type CreateEmployeeInput = Omit<Employee, 'id' | 'created_at' | 'updated_at'>;
export type UpdateEmployeeInput = Partial<CreateEmployeeInput>; 