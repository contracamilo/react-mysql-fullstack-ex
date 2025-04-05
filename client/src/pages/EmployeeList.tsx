import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Paper,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import EmployeeTable from '../components/employees/EmployeeTable';
import { getEmployees } from '../services/employeeService';

const EmployeeList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: employees, isLoading, error } = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployees
  });

  const filteredEmployees = employees?.filter((employee) =>
    Object.values(employee).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Employee List
      </Typography>
      
      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search employees..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <EmployeeTable 
        employees={filteredEmployees || []}
        isLoading={isLoading}
        error={error as Error | null}
      />
    </Box>
  );
};

export default EmployeeList; 