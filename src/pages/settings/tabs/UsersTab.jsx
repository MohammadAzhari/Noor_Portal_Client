import { useEffect, useState } from 'react';
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
import { arrayWrapperWithId, reqHandler } from '../../../utils/handyFunctions';
import api from '../../../api/requests';
import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import toastMessages from '../../../utils/toastmessages';

export default function UsersTab() {
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userRole, setUserRole] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = reqHandler(async () => {
    const res = await api.getUsers();
    setUsers(res.users);
  }, setIsLoading);

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
    reqHandler(async () => {
      await api.createUser({
        username: userName,
        email: userEmail,
        password: userPassword,
        role: userRole,
      });
      toast.success(toastMessages.created);
      fetchData();
    }, setIsLoading)();
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
        rows={arrayWrapperWithId(users)}
        columns={usersColumns}
        loading={isLoading}
        autoHeight
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
          <RadioGroup
            sx={{ mt: 2 }}
            row
            value={userRole}
            onChange={handleUserRoleChange}
          >
            <FormControlLabel value='admin' control={<Radio />} label='Admin' />
            <FormControlLabel
              value='reception'
              control={<Radio />}
              label='Reception'
            />
            <FormControlLabel
              value='accounting'
              control={<Radio />}
              label='Accounting'
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            color='error'
            onClick={handleAddUserDialogClose}
          >
            Cancel
          </Button>
          <Button
            variant='outlined'
            color='success'
            disabled={isLoading}
            onClick={handleAddUserSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
