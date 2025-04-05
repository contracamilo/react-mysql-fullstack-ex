import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
  Typography,
  Box,
  Snackbar,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Employee } from '../../types/Employee';
import EditDialog from './EditDialog';
import ConfirmationDialog from '../common/ConfirmationDialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEmployee } from '../../services/employeeService';

interface EmployeeTableProps {
  employees: Employee[];
  isLoading: boolean;
  error: Error | null;
}

const EmployeeTable = ({ employees, isLoading, error }: EmployeeTableProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      setDeleteDialogOpen(false);
      setSelectedEmployee(null);
      setSuccessMessage('Employee deleted successfully');
    },
    onError: (err: Error) => {
      setSuccessMessage(`Error deleting employee: ${err.message}`);
    },
  });

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error loading employees: {error.message}</Alert>;
  }

  if (!employees.length) {
    return (
      <Typography variant="h6" sx={{ textAlign: 'center', py: 3 }}>
        No employees found
      </Typography>
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Department</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setSelectedEmployee(employee);
                      setEditDialogOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setSelectedEmployee(employee);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <EditDialog
        open={editDialogOpen}
        onClose={() => {
          setEditDialogOpen(false);
          setSelectedEmployee(null);
        }}
        employee={selectedEmployee}
      />

      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Delete Employee"
        content="Are you sure you want to delete this employee? This action cannot be undone."
        onConfirm={() => {
          if (selectedEmployee) {
            deleteMutation.mutate(selectedEmployee.id);
          }
        }}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setSelectedEmployee(null);
        }}
        isLoading={deleteMutation.isPending}
      />

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSuccessMessage(null)}
          severity={successMessage?.startsWith('Error') ? 'error' : 'success'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EmployeeTable; 