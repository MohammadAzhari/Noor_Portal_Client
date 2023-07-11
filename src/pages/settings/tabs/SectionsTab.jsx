import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { arrayWrapperWithId, reqHandler } from '../../../utils/handyFunctions';
import api from '../../../api/requests';

export default function SectionsTab() {
  const [addSectionDialogOpen, setAddSectionDialogOpen] = useState(false);
  const [sectionName, setSectionName] = useState('');
  const [serviceSectionsRows, setServiceSectionsRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = reqHandler(async () => {
    const response = await api.getServicesSections();
    setServiceSectionsRows(response.sections);
  }, setIsLoading);

  const handleAddSectionDialogOpen = () => {
    setAddSectionDialogOpen(true);
  };
  const handleAddSectionDialogClose = () => {
    setAddSectionDialogOpen(false);
  };
  const handleSectionNameChange = (event) => {
    setSectionName(event.target.value);
  };

  const handleAddSectionSubmit = async (event) => {
    event.preventDefault();
    console.log(`Submitting section name: ${sectionName}`);
    handleAddSectionDialogClose();
  };

  const serviceSectionsColumns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <IconButton sx={{ color: 'error.main' }}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={handleAddSectionDialogOpen}
        >
          Add Section
        </Button>
      </Box>
      <DataGrid
        rows={arrayWrapperWithId(serviceSectionsRows)}
        columns={serviceSectionsColumns}
        loading={isLoading}
        autoHeight
      />
      <Dialog open={addSectionDialogOpen} onClose={handleAddSectionDialogClose}>
        <DialogTitle>Add Section</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='section-name'
            label='Name'
            type='text'
            required
            fullWidth
            value={sectionName}
            onChange={handleSectionNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={handleAddSectionDialogClose}>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleAddSectionSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
