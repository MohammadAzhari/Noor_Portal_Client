import http, { handler } from './http';

const api = {
  loginUser: (data) => handler(http.post('/users/login', data)),
  getCustomers: (params) => handler(http.get('/customers', { params })),
  createCustomer: (data) => handler(http.post('/customers', data)),
  deleteCustomer: (id) => handler(http.delete('/customers/' + id)),
  createSectionForServices: (data) =>
    handler(http.post('/settings/sections', data)),
  getServicesSections: () => handler(http.get('/services/sections')),
  deleteSectionForServices: (id) =>
    handler(http.delete('/settings/sections' + id)),
  createUser: (data) => handler(http.post('/users/signup', data)),
  getUsers: (params) => handler(http.get('/users', { params })),
};

export default api;
