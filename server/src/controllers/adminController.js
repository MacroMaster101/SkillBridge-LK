import * as adminService from '../services/adminService.js';

export async function getStats(_req, res, next) {
  try {
    const stats = await adminService.getPlatformStats();
    res.json(stats);
  } catch (err) {
    next(err);
  }
}
