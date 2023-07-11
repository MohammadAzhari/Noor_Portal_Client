import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { DataGrid, GridColumn } from '@mui/x-data-grid';
import { Add, Delete, Visibility } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import api from '../../api/requests';
import { toast } from 'react-toastify';
import CreateCustomerForm from '../../components/CreateCustomerForm';
import ConformationDialog from '../../components/ConformationDialog';
import toastMessages from '../../utils/toastmessages';

function CustomerListPage() {
  const [openAddCustomerFrom, setOpenAddCustomerForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    name: '',
    phone: '',
  });
  const [deletedId, setDeletedId] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await api.getCustomers(searchFilters);
      setRows(response.customers);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCustomer = async () => {
    try {
      await api.deleteCustomer(deletedId);
      toast.success(toastMessages.deleted);
      fetchData();
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    {
      field: 'balance',
      headerName: 'balance',
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      flex: 0.5,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            // justifyContent: 'center',
            width: '100%',
          }}
        >
          <Link to={'/customers/' + params.id}>
            <IconButton color='primary'>
              <Visibility />
            </IconButton>
          </Link>
          <IconButton color='error' onClick={() => setDeletedId(params.id)}>
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <ConformationDialog
          isOpen={deletedId !== false}
          handleClose={() => setDeletedId(false)}
          onConfirm={handleDeleteCustomer}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            label='Phone number'
            onChange={(e) =>
              setSearchFilters({ ...searchFilters, phone: e.target.value })
            }
            value={searchFilters.phone}
            size='small'
            variant='outlined'
          />
          <TextField
            label='Name'
            value={searchFilters.name}
            onChange={(e) =>
              setSearchFilters({ ...searchFilters, name: e.target.value })
            }
            size='small'
            variant='outlined'
          />
          <Button
            variant='contained'
            onClick={() => fetchData()}
            sx={{ ml: 1 }}
          >
            Search
          </Button>
        </Box>
        <Button
          endIcon={<Add />}
          variant='contained'
          onClick={() => setOpenAddCustomerForm(true)}
        >
          Add customer
        </Button>
        <CreateCustomerForm
          fetchData={fetchData}
          openAddCustomerFrom={openAddCustomerFrom}
          setOpenAddCustomerForm={setOpenAddCustomerForm}
        />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <DataGrid
          rows={rows.map((item) => ({
            ...item,
            id: item._id,
          }))}
          columns={columns}
          autoHeight
          loading={isLoading}
        />
      </Box>
    </Box>
  );
}

export default CustomerListPage;
