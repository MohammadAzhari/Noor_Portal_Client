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
import { Add } from '@mui/icons-material';
import ServicesPage from '../../services/ServicesPage';

function PackagesCreate() {
  const [packageName, setPackageName] = useState('');
  const [rows, setRows] = useState([]);

  const handlePackageNameChange = (event) => {
    setPackageName(event.target.value);
  };

  const handleAddRows = (item) => {
    setRows([...rows, item]);
  };

  const handleCreatePackage = () => {};

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
        <ServicesPage fromPackages={{ handleAddRows }} />
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
        <Typography variant='h5'>Create New Package</Typography>
        <TextField
          label='Package Name'
          variant='outlined'
          value={packageName}
          onChange={handlePackageNameChange}
          sx={{ mb: 2 }}
        />
        <TableContainer sx={{ maxWidth: '100%', minHeight: '300px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Section</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.section}</TableCell>
                  <TableCell>{row.price}</TableCell>
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
            <Typography variant='h5' sx={{ fontWeight: 'bold', fontSize: 24 }}>
              ${totalPrice.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
        <Button
          variant='contained'
          color='primary'
          endIcon={<Add />}
          sx={{ mt: 2 }}
          onClick={handleCreatePackage}
        >
          Create Package
        </Button>
      </Grid>
    </Grid>
  );
}

export default PackagesCreate;
