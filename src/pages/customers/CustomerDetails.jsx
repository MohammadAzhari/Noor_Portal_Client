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

const Container = styled(Box)({
  width: '100%',
  margin: '0 auto',
  display: 'flex',
  padding: 12,
  flexWrap: 'wrap',
});

export default function CustomerDetailsPage() {
  return (
    <Container>
      {
        <Box
          sx={{
            display: 'flex',
            border: 'black solid 2px',
            p: 6,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant='h5' gutterBottom>
              Customer Details
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
              <AccountCircleIcon sx={{ mr: 1 }} />
              <Typography variant='subtitle1'>John Smith</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <PhoneIcon sx={{ mr: 1 }} />
              <Typography variant='subtitle1'>+1 234 567 890</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <LocationOnIcon sx={{ mr: 1 }} />
              <Typography variant='subtitle1'>
                123 Main St, Anytown USA
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <AttachMoneyIcon sx={{ mr: 1 }} />
              <Typography variant='subtitle1'>10% discount</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <AttachMoneyIcon sx={{ mr: 1 }} />
              <Typography variant='subtitle1'>
                Created at: 2022-01-01
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
              5000$
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
                color='error'
                startIcon={<CreditCardIcon />}
              >
                Debit Balance
              </Button>
              <Button
                variant='contained'
                color='success'
                startIcon={<CreditCardIcon />}
              >
                Credit Balance
              </Button>
            </Box>
          </Box>
        </Box>
      }
      {<CustomerPackages />}
    </Container>
  );
}
