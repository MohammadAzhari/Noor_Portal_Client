import React, { useState } from 'react';
import {
  Grid,
  Typography,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import ServicesPage from '../../services/ServicesPage';
import { reqHandler, toastError } from '../../../utils/handyFunctions';
import api from '../../../api/requests';
import { toast } from 'react-toastify';
import toastMessages from '../../../utils/toastmessages';

function PackagesCreate() {
  const [packageName, setPackageName] = useState('');
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePackageNameChange = (event) => {
    setPackageName(event.target.value);
  };

  const handleDeleteRow = (index) => {
    const newArray = [];
    for (let i in rows) if (i != index) newArray.push(rows[i]);
    setRows(newArray);
  };

  const handleAddRows = (item) => {
    setRows([...rows, item]);
  };

  const handleSubmitForm = reqHandler(async () => {
    if (!rows.length) {
      return toastError('Choose one service at least');
    }
    const data = {
      name: packageName,
      services: rows.map((item) => item._id),
    };
    await api.createPackage(data);
    toast.success(toastMessages.created);
    setRows([]);
    setPackageName('');
  }, setIsLoading);

  const totalPrice = rows.reduce((total, row) => total + Number(row.price), 0);

  return (
    <Grid
      container
      sx={{
        width: '100%',
        justifyContent: 'center',
        bgcolor: 'background.paper',
        p: 2,
      }}
    >
      {/* left */}
      <Grid item xs={6} sx={{ pr: 4 }}>
        <Typography variant='h5'>Choose Services</Typography>
        <ServicesPage fromPackages handleAddRows={handleAddRows} />
      </Grid>
      {/* right */}
      <Grid
        item
        xs={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitForm();
          }}
        >
          <Typography variant='h5'>Create New Package</Typography>
          <TextField
            label='Package Name'
            variant='outlined'
            required
            fullWidth
            value={packageName}
            onChange={handlePackageNameChange}
            sx={{ mb: 2, mt: 2 }}
          />
          <TableContainer sx={{ maxWidth: '100%', minHeight: '300px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Section</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.section}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>
                      <Delete
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteRow(index)}
                        color='error'
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Card sx={{ maxWidth: '100%', mt: 2, boxShadow: 3, borderRadius: 1 }}>
            <CardContent
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                p: 2,
              }}
            >
              <Typography variant='h6'>Total Price:</Typography>
              <Typography
                variant='h5'
                sx={{ fontWeight: 'bold', fontSize: 24 }}
              >
                {totalPrice.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            fullWidth
            endIcon={<Add />}
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            Create Package
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default PackagesCreate;
