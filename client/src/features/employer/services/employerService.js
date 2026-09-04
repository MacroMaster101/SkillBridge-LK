import api from '../../../services/api';

export const employerService = {
  create: (data) => api.post('/employers', data),
  getMe: () => api.get('/employers/me'),
};
