import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from 'react-query';
import {
  Box,
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Alert,
  Snackbar,
} from '@mui/material';
import { z } from 'zod';
import axios from 'axios';
import { Employee } from '../types/employee';

const employeeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().min(18, 'Age must be at least 18'),
  country: z.string().min(1, 'Country is required'),
  position: z.string().min(1, 'Position is required'),
  years: z.number().min(0, 'Years must be non-negative'),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

interface EmployeeFormProps {
  employee?: Employee;
  onSuccess?: () => void;
}

const EmployeeForm = ({ employee, onSuccess }: EmployeeFormProps) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: '',
      age: undefined,
      country: '',
      position: '',
      years: undefined,
    },
  });

  useEffect(() => {
    if (employee) {
      reset({
        name: employee.name,
        age: employee.age,
        country: employee.country,
        position: employee.position,
        years: employee.years,
      });
    }
  }, [employee, reset]);

  const mutation = useMutation(
    (data: EmployeeFormData) => {
      if (employee) {
        return axios.put(`http://localhost:3000/api/employees/${employee.id}`, data);
      }
      return axios.post('http://localhost:3000/api/employees', data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('employees');
        setOpenSnackbar(true);
        if (!employee) {
          reset();
        }
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: (error: any) => {
        setError(error.response?.data?.message || 'An error occurred');
      },
    }
  );

  const onSubmit = (data: EmployeeFormData) => {
    mutation.mutate(data);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {employee ? 'Edit Employee' : 'Add New Employee'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Age"
                  type="number"
                  error={!!errors.age}
                  helperText={errors.age?.message}
                  onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : '')}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Country"
                  error={!!errors.country}
                  helperText={errors.country?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="position"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Position"
                  error={!!errors.position}
                  helperText={errors.position?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="years"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Years of Experience"
                  type="number"
                  error={!!errors.years}
                  helperText={errors.years?.message}
                  onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : '')}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? 'Saving...' : employee ? 'Update Employee' : 'Add Employee'}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
          {employee ? 'Employee updated successfully!' : 'Employee added successfully!'}
        </Alert>
      </Snackbar>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
    </Paper>
  );
};

export default EmployeeForm; 