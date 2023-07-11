import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React from 'react';

export default function ConformationDialog({ isOpen, handleClose, onConfirm }) {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <Box width={'30vw'}>
        <DialogTitle color='error'>Warning</DialogTitle>
        <DialogContent>Are you sure?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              onConfirm();
              handleClose();
            }}
            variant='outlined'
            color='error'
          >
            Confirm
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
