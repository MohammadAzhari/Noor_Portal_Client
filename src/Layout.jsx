import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Divider,
  Menu,
  MenuItem,
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
  Shop,
  BrowseGallery,
  ShoppingBag,
} from '@mui/icons-material';
import storage from './localstorage';

const sidebarListPages = [
  {
    text: 'Customers',
    icon: <People />,
    utl: '/customers',
  },
  {
    text: 'Services',
    icon: <Shop />,
    utl: '/services',
  },
  {
    text: 'Packages',
    icon: <ShoppingBag />,
    utl: '/packages',
  },
  {
    text: 'Settings',
    icon: <Settings />,
    utl: '/settings',
  },
];

function Layout(props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigator = useNavigate();

  const handleSidebarOpen = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleLogoutClick = () => {
    storage.removeToken();
    navigator('/');
    window.location.reload();
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
            position: 'fixed',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Toolbar />
            <List sx={{}}>
              {sidebarListPages.map((item, index) => (
                <Box key={index}>
                  <ListItem button component={Link} to={item.utl}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                  <Divider />
                </Box>
              ))}
            </List>
          </Box>
        </Box>
      )}
      {/* Main content */}
      <Box
        component='main'
        sx={{ flexGrow: 1, p: 3, ml: isSidebarOpen ? '13%' : '2px' }}
      >
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
            <IconButton color='inherit' onClick={handleMenuClick}>
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Box sx={{ mt: 2 }}>{props.children}</Box>
      </Box>
    </Box>
  );
}

export default Layout;
