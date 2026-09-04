import api from '../../../services/api';

export const candidateService = {
  getMe: () => api.get('/candidates/me'),
  updateMe: (data) => api.put('/candidates/me', data),
  updateSkills: (skills) => api.put('/candidates/me/skills', { skills }),
  getRecommendations: () => api.get('/candidates/me/recommendations'),
};
