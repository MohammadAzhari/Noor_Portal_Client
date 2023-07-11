import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon,
  ExitToApp as ExitToAppIcon,
  People,
  Settings,
} from '@mui/icons-material';

const sidebarListPages = [
  {
    text: 'customers',
    icon: <People />,
    utl: '/customers',
  },
  {
    text: '',
    icon: <></>,
    utl: '',
  },
  {
    text: '',
    icon: <></>,
    utl: '',
  },
  {
    text: '',
    icon: <></>,
    utl: '',
  },
  {
    text: 'Settings',
    icon: <Settings />,
    utl: '/settings',
  },
];

function Layout(props) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const handleSidebarOpen = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleLogoutClick = () => {
    // Implement your logout logic here
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      {isSidebarOpen && (
        <Box
          sx={{
            width: '10%',
            display: 'flex',
            justifyContent: 'center',
            px: 3,
            backgroundColor: '#eee',
            height: '100vh',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Toolbar />
            <List sx={{}}>
              {sidebarListPages.map((item, index) => (
                <ListItem key={index} button component={Link} to={item.utl}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      )}
      {/* Main content */}
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <AppBar position='static' color='default'>
          <Toolbar>
            <IconButton
              color='inherit'
              onClick={handleSidebarOpen}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' sx={{ flexGrow: 1 }}>
              My App
            </Typography>
            <IconButton color='inherit'>
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ mt: 2 }}>{props.children}</Box>
      </Box>
    </Box>
  );
}

export default Layout;
