import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../api/requests';
import toastMessages from '../utils/toastmessages';

export default function CreateCustomerForm({
  openAddCustomerFrom,
  setOpenAddCustomerForm,
  fetchData,
}) {
  const initialFormData = { name: '', phone: '', address: '' };
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await api.createCustomer(formData);
      toast.success(toastMessages.created);
      setOpenAddCustomerForm(false);
      setFormData(initialFormData);
      fetchData();
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={openAddCustomerFrom}
      onClose={() => setOpenAddCustomerForm(false)}
    >
      <Box width={'50vw'}>
        <DialogTitle variant='h4'>Add customer</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              p: 3,
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <TextField
              required
              fullWidth
              label='Name'
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
              variant='outlined'
            />
            <TextField
              fullWidth
              required
              label='Phone number'
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              variant='outlined'
            />
            <TextField
              value={formData.address}
              fullWidth
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              label='Address'
              variant='outlined'
            />
            <Button
              disabled={isLoading}
              onClick={handleSubmit}
              variant='contained'
            >
              {isLoading ? 'Loading ...' : 'Submit'}
            </Button>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
}
