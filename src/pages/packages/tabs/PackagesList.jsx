import { useEffect, useState } from 'react';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { Cancel as CancelIcon, CheckCircle } from '@mui/icons-material';
import { arrayWrapperWithId, reqHandler } from '../../../utils/handyFunctions';
import { DataGrid } from '@mui/x-data-grid';
import api from '../../../api/requests';

export default function PackagesList() {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterName, setFilterName] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = reqHandler(async () => {
    const res = await api.getPackages({ name: filterName });
    setPackages(res.packages);
  }, setIsLoading);

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'createdBy', headerName: 'Created By', flex: 1 },
    {
      field: 'services',
      headerName: 'Services',
      flex: 1,
      renderCell: (params) => (
        <div>
          {params.value.map((service) => (
            <Typography key={service} variant='body2'>
              {service}
            </Typography>
          ))}
        </div>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Typography
          variant='body2'
          sx={{
            color:
              params.value === 'Active'
                ? 'success.main'
                : params.value === 'Inactive'
                ? 'error.main'
                : 'text.primary',
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          sx={{
            color:
              params.row.status === 'Active' ? 'success.main' : 'error.main',
          }}
        >
          {params.row.status === 'Active' ? <CheckCircle /> : <CancelIcon />}
        </IconButton>
      ),
    },
  ];

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', height: '100%', mt: 2 }}
    >
      <form onSubmit={handleFormSubmit} style={{ marginBottom: '16px' }}>
        <TextField
          size='small'
          label='Name'
          value={filterName}
          onChange={handleFilterNameChange}
          sx={{ marginRight: '16px' }}
        />
        <Button variant='contained' type='submit'>
          Search
        </Button>
      </form>
      <DataGrid
        rows={arrayWrapperWithId(packages)}
        loading={isLoading}
        columns={columns}
        autoHeight
      />
    </Box>
  );
}
