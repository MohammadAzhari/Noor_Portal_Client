import { Routes, Route } from 'react-router-dom';
import CustomerDetailsPage from './pages/customers/CustomerDetails';
import ListCustomers from './pages/customers/ListCustomers';
import PackagesPage from './pages/packages/PackagesPage';
import ServicesPage from './pages/services/ServicesPage';
import SettingsPage from './pages/settings/SettingsPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<></>} />
      <Route path='/customers' element={<ListCustomers />} />
      <Route path='/customers/:id' element={<CustomerDetailsPage />} />
      <Route path='/settings' element={<SettingsPage />} />
      <Route path='/services' element={<ServicesPage />} />
      <Route path='/packages' element={<PackagesPage />} />
    </Routes>
  );
}
