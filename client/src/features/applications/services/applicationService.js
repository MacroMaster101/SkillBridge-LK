import api from '../../../services/api';

export const applicationService = {
  getMyApplications: () => api.get('/applications/me'),
  updateStatus: (applicationId, status) =>
    api.patch(`/applications/${applicationId}/status`, { status }),
};
