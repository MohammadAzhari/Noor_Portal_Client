import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import PackagesList from './tabs/PackagesList';
import PackagesCreate from './tabs/PackagesCreate';

const PackagesPage = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newTab) => {
    setCurrentTab(newTab);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Tabs
        value={currentTab}
        sx={{ bgcolor: '#eee' }}
        onChange={handleTabChange}
      >
        <Tab label='List Packages' />
        <Tab label='Create Package' />
      </Tabs>
      {currentTab === 0 && <PackagesList />}
      {currentTab === 1 && <PackagesCreate />}
    </Box>
  );
};

export default PackagesPage;
