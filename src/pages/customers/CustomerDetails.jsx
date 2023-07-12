import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import CustomerPackages from '../../components/CustomerPackages';
import { useEffect, useState } from 'react';
import { reqHandler } from '../../utils/handyFunctions';
import api from '../../api/requests';
import { useParams } from 'react-router-dom';
import LoadingComponent from '../../components/LoadingComponent';
import { CalendarMonth } from '@mui/icons-material';

const Container = styled(Box)({
  width: '100%',
  margin: '0 auto',
  display: 'flex',
  padding: 12,
});

export default function CustomerDetailsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [customer, setCustomer] = useState();

  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = reqHandler(async () => {
    const res = await api.getCustomerByPhoneOrId(id);
    setCustomer(res.customer);
  }, setIsLoading);

  if (isLoading) return <LoadingComponent />;

  return (
    <Container>
      {
        <Box
          sx={{
            flex: 0.8,
            display: 'flex',
            border: 'gray solid 2px',
            p: 6,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box width={'100%'}>
            <Typography variant='h5' gutterBottom>
              Customer Details
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
              <AccountCircleIcon sx={{ mr: 1 }} />
              <Typography variant='subtitle1'>{customer.name}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <PhoneIcon sx={{ mr: 1 }} />
              <Typography variant='subtitle1'>{customer.phone}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <LocationOnIcon sx={{ mr: 1 }} />
              <Typography variant='subtitle1'>{customer.address}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <AttachMoneyIcon sx={{ mr: 1 }} />
              <Typography variant='subtitle1'>
                {customer.discount}% discount
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <CalendarMonth sx={{ mr: 1 }} />
              <Typography variant='subtitle1'>
                Created at: {new Date(customer.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant='h5' gutterBottom>
              Balance
            </Typography>
            <Button
              color='success'
              size='large'
              fullWidth
              variant='outlined'
              sx={{ paddingY: 2, fontSize: 21 }}
            >
              {customer.balance}$
            </Button>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 3,
                gap: 3,
              }}
            >
              <Button
                variant='contained'
                color='success'
                startIcon={<CreditCardIcon />}
                fullWidth
              >
                Add Balance
              </Button>
            </Box>
          </Box>
        </Box>
      }
      {<CustomerPackages />}
    </Container>
  );
}
