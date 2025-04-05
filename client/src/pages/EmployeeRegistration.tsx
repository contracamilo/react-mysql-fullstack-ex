import { Box, Typography, Paper } from '@mui/material';
import EmployeeForm from '../components/employees/EmployeeForm';

const EmployeeRegistration = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Register New Employee
      </Typography>
      
      <Paper sx={{ p: 3 }}>
        <EmployeeForm />
      </Paper>
    </Box>
  );
};

export default EmployeeRegistration; 