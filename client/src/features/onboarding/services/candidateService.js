import api from '../../../services/api';

export const candidateService = {
  getMe: () => api.get('/candidates/me'),
  updateMe: (data) => api.put('/candidates/me', data),
  updateSkills: (skillNames) => api.put('/candidates/me/skills', { skillNames }),
};
