import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Employee } from '../../types/Employee';
import EmployeeForm from './EmployeeForm';

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  employee: Employee | null;
}

const EditDialog = ({ open, onClose, employee }: EditDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Employee</DialogTitle>
      <DialogContent>
        <EmployeeForm employee={employee} onSuccess={onClose} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog; 