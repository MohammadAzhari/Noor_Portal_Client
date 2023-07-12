import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Add } from '@mui/icons-material';

const Container = styled(Box)({
  flex: 2,
  margin: '0 auto',
  padding: '16px',
});
const rows = [
  {
    id: 1,
    name: 'Package 1',
    createdBy: 'John Doe',
    services: ['Service 1', 'Service 2'],
    status: 'Active',
  },
  {
    id: 2,
    name: 'Package 2',
    createdBy: 'Jane Smith',
    services: ['Service 2', 'Service 3'],
    status: 'Inactive',
  },
  {
    id: 3,
    name: 'Package 3',
    createdBy: 'Bob Johnson',
    services: ['Service 1', 'Service 3'],
    status: 'Active',
  },
];

const CustomerPackages = () => {
  const [packageRows, setPackageRows] = useState(rows);

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
          onClick={() => handleStatusChange(params.row.id)}
        >
          {params.row.status === 'Active' ? (
            <CheckCircleIcon />
          ) : (
            <CancelIcon />
          )}
        </IconButton>
      ),
    },
  ];

  const handleStatusChange = (id) => {
    const newRows = packageRows.map((row) =>
      row.id === id
        ? { ...row, status: row.status === 'Active' ? 'Inactive' : 'Active' }
        : row
    );
    setPackageRows(newRows);
  };

  return (
    <Container>
      <Box
        sx={{
          flex: 2,
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant='h5' gutterBottom>
          Packages
        </Typography>
        <Button endIcon={<Add />} variant='contained' color='primary'>
          Add Package
        </Button>
      </Box>
      <Box sx={{ height: 400, mt: 3 }}>
        <DataGrid rows={packageRows} columns={columns} pageSize={5} />
      </Box>
    </Container>
  );
};

export default CustomerPackages;
