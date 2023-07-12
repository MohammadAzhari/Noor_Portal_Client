import http, { handler } from './http';

const api = {
  loginUser: (data) => handler(http.post('/users/login', data)),

  getCustomers: (params) => handler(http.get('/customers', { params })),

  getCustomerByPhoneOrId: (id) => handler(http.get('/customers/' + id)),

  createCustomer: (data) => handler(http.post('/customers', data)),

  deleteCustomer: (id) => handler(http.delete('/customers/' + id)),

  createSectionForServices: (data) =>
    handler(http.post('/settings/sections', data)),

  getServicesSections: () => handler(http.get('/services/sections')),

  deleteSectionForServices: (id) =>
    handler(http.delete('/settings/sections/' + id)),

  createUser: (data) => handler(http.post('/users/signup', data)),

  getUsers: (params) => handler(http.get('/users', { params })),

  getServices: (params) => handler(http.get('services', { params })),

  createService: (data) => handler(http.post('/services', data)),

  getPackages: (params) => handler(http.get('/packages', { params })),

  createPackage: (data) => handler(http.post('/packages', data)),
};

export default api;
