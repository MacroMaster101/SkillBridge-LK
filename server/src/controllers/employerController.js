import * as employerService from '../services/employerService.js';

export async function createEmployer(req, res, next) {
  try {
    const employer = await employerService.createEmployerProfile(req.user.id, req.body);
    res.status(201).json(employer);
  } catch (err) {
    next(err);
  }
}

export async function updateEmployer(req, res, next) {
  try {
    const employer = await employerService.updateEmployerProfile(req.user.id, req.body);
    res.json(employer);
  } catch (err) {
    next(err);
  }
}

export async function getMe(req, res, next) {
  try {
    const dashboard = await employerService.getEmployerDashboard(req.user.id);
    res.json(dashboard);
  } catch (err) {
    next(err);
  }
}
