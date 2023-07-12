import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import {
  AccountCircle,
  Cancel as CancelIcon,
  CheckCircle,
  Email,
} from '@mui/icons-material';
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
    {
      field: 'createdBy',
      headerName: 'Created By',
      flex: 1,
      renderCell: ({ row }) => (
        <Box spacing={2} flexDirection='column' alignItems='center'>
          <Box display={'flex'} alignItems={'center'} gap={2}>
            <AccountCircle />
            <span>{row.createdBy.username}</span>
          </Box>
          <Box display={'flex'} alignItems={'center'} gap={2}>
            <Email />
            <span>{row.createdBy.email}</span>
          </Box>
        </Box>
      ),
    },
    {
      field: 'services',
      headerName: 'Services',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ overflowY: 'scroll', width: '100%' }}>
          {params.value.map((service, i) => (
            <Typography key={i} variant='body2'>
              <Chip label={i + 1} /> {service.name}
            </Typography>
          ))}
        </Box>
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
        rowHeight={80}
        autoHeight
      />
    </Box>
  );
}
