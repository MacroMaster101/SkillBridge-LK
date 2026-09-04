import api from '../../../services/api';

export const jobService = {
  getAll: (params) => api.get('/jobs', { params }),
  getById: (id) => api.get(`/jobs/${id}`),
  create: (data) => api.post('/jobs', data),
  apply: (jobId, data) => api.post(`/jobs/${jobId}/apply`, data),
  getApplicants: (jobId) => api.get(`/jobs/${jobId}/applications`),
};
