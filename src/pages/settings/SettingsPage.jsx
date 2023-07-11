import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SectionsTab from './tabs/SectionsTab';
import UsersTab from './tabs/UsersTab';

export default function SettingsPage() {
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Tabs sx={{ bgcolor: '#eee' }} value={value} onChange={handleTabChange}>
        <Tab label="Service's Sections" />
        <Tab label='Users' />
      </Tabs>

      {value === 0 && <SectionsTab />}
      {value === 1 && <UsersTab />}
    </Box>
  );
}
