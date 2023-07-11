import { useState } from 'react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { DataGrid } from '@mui/x-data-grid';
import { arrayWrapperWithId } from '../../../utils/handyFunctions';

export default function UsersTab() {
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userRole, setUserRole] = useState('');

  const usersColumns = [
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <IconButton sx={{ color: 'primary.main' }}>
          <MoreHorizIcon />
        </IconButton>
      ),
    },
  ];

  const usersRows = [
    {
      id: 1,
      username: 'John Doe',
      email: 'johndoe@example.com',
      role: 'Admin',
    },
    {
      id: 2,
      username: 'Jane Smith',
      email: 'janesmith@example.com',
      role: 'Reception',
    },
    {
      id: 3,
      username: 'Bob Johnson',
      email: 'bobjohnson@example.com',
      role: 'Accounting',
    },
  ];
  const handleAddUserDialogOpen = () => {
    setAddUserDialogOpen(true);
  };

  const handleAddUserDialogClose = () => {
    setAddUserDialogOpen(false);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const handleUserPasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

  const handleUserRoleChange = (event) => {
    setUserRole(event.target.value);
  };

  const handleAddUserSubmit = (event) => {
    event.preventDefault();
    console.log(
      `Submitting user data: ${userName}, ${userEmail}, ${userPassword}, ${userRole}`
    );
    handleAddUserDialogClose();
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={handleAddUserDialogOpen}
        >
          Add User
        </Button>
      </Box>
      <DataGrid
        rows={arrayWrapperWithId(usersRows)}
        columns={usersColumns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
      />
      <Dialog open={addUserDialogOpen} onClose={handleAddUserDialogClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='username'
            label='Username'
            type='text'
            required
            fullWidth
            value={userName}
            onChange={handleUserNameChange}
          />
          <TextField
            margin='dense'
            id='email'
            label='Email'
            type='email'
            required
            fullWidth
            value={userEmail}
            onChange={handleUserEmailChange}
          />
          <TextField
            margin='dense'
            id='password'
            label='Password'
            type='password'
            fullWidth
            required
            value={userPassword}
            onChange={handleUserPasswordChange}
          />
          <Select
            fullWidth
            value={userRole}
            onChange={handleUserRoleChange}
            label='Role'
            required
            id='role'
          >
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='reception'>Reception</MenuItem>
            <MenuItem value='accounting'>Accounting</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddUserDialogClose}>Cancel</Button>
          <Button onClick={handleAddUserSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
