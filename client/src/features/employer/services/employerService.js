import api from '../../../services/api';

export const employerService = {
  create: (data) => api.post('/employers', data),
  update: (data) => api.put('/employers/me', data),
  getMe: () => api.get('/employers/me'),
};
