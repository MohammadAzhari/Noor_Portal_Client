import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { arrayWrapperWithId, reqHandler } from '../../utils/handyFunctions';
import api from '../../api/requests';
import { toast } from 'react-toastify';
import toastMessages from '../../utils/toastmessages';
import { Add } from '@mui/icons-material';

const initialServiceState = {
  name: '',
  type: 'service',
  section: '',
  price: '',
};

const initialFilterState = {
  name: '',
  type: 'all',
  section: 'all',
};

const ServicesPage = ({ fromPackages, handleAddRows }) => {
  const [services, setServices] = useState([]);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [serviceForm, setServiceForm] = useState(initialServiceState);
  const [filterForm, setFilterForm] = useState(initialFilterState);
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSections = reqHandler(async () => {
    const res = await api.getServicesSections();
    setSections(res.sections.map((item) => item.name));
  }, setIsLoading);

  const fetchServices = reqHandler(async () => {
    const res = await api.getServices(filterForm);
    setServices(res.services);
  }, setIsLoading);

  const handleServiceFormChange = (event) => {
    setServiceForm((prevForm) => ({
      ...prevForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFilterFormChange = (event) => {
    setFilterForm((prevForm) => ({
      ...prevForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleServiceFormSubmit = () => {
    reqHandler(async () => {
      await api.createService(serviceForm);
      toast.success(toastMessages.created);
      fetchServices();
      setServiceDialogOpen(false);
    }, setIsLoading)();
  };

  const handleFilterFromSubmit = () => {
    fetchServices();
  };

  useEffect(() => {
    Promise.all([fetchServices(), fetchSections()]);
  }, []);

  const onPriceCellRender = (params) => {
    return <strong>{params.value}</strong>;
  };

  let columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ fontWeight: 'bold' }}>{params.value}</Box>
      ),
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
    },
    {
      field: 'section',
      headerName: 'Section',
      flex: 1,
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
      renderCell: onPriceCellRender,
    },
  ];

  if (fromPackages) {
    columns = [
      ...columns,
      {
        field: 'actions',
        headerName: 'Add',
        flex: 1,
        renderCell: (params) => (
          <Button
            variant='contained'
            onClick={() => handleAddRows(params.row)}
            endIcon={<Add />}
          >
            add
          </Button>
        ),
      },
    ];
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleFilterFromSubmit();
          }}
          style={{ display: 'flex', gap: '16px' }}
        >
          <FormControl>
            <FormLabel>Name</FormLabel>
            <TextField
              name='name'
              size='small'
              value={filterForm.name}
              onChange={handleFilterFormChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Type</FormLabel>
            <Select
              size='small'
              name='type'
              value={filterForm.type}
              onChange={handleFilterFormChange}
            >
              <MenuItem value='all'>All</MenuItem>
              <MenuItem value='service'>Service</MenuItem>
              <MenuItem value='retail'>Retail</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Section</FormLabel>
            <Select
              size='small'
              name='section'
              value={filterForm.section}
              onChange={handleFilterFormChange}
            >
              <MenuItem value='all'>All</MenuItem>
              {sections.map((section) => (
                <MenuItem value={section} key={section}>
                  {section}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ marginTop: 3 }}>
            <Button type='submit' variant='contained'>
              search
            </Button>
          </Box>
        </form>
        {!fromPackages && (
          <Button
            color='primary'
            variant='contained'
            startIcon={<AddIcon />}
            onClick={() => setServiceDialogOpen(true)}
          >
            Add Service
          </Button>
        )}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <DataGrid
          autoHeight
          rows={arrayWrapperWithId(services)}
          columns={columns}
          loading={isLoading}
        />
      </Box>
      <Dialog
        open={serviceDialogOpen}
        onClose={() => setServiceDialogOpen(false)}
      >
        <DialogTitle>Add Service</DialogTitle>
        <DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleServiceFormSubmit();
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <TextField
              label='Name'
              name='name'
              required
              value={serviceForm.name}
              onChange={handleServiceFormChange}
            />
            <FormControl component='fieldset'>
              <FormLabel>Type</FormLabel>
              <RadioGroup
                name='type'
                value={serviceForm.type}
                onChange={handleServiceFormChange}
              >
                <FormControlLabel
                  value='service'
                  control={<Radio />}
                  label='Service'
                />
                <FormControlLabel
                  value='retail'
                  control={<Radio />}
                  label='Retail'
                />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Section</FormLabel>
              <Select
                name='section'
                required
                value={serviceForm.section}
                onChange={handleServiceFormChange}
              >
                {sections.map((section) => (
                  <MenuItem value={section} key={section}>
                    {section}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label='Price'
              name='price'
              required
              value={serviceForm.price}
              onChange={handleServiceFormChange}
            />
            <DialogActions>
              <Button onClick={() => setServiceDialogOpen(false)}>
                Cancel
              </Button>
              <Button type='submit' variant='contained' color='primary'>
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ServicesPage;
