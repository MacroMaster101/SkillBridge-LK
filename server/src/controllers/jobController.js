import * as jobService from '../services/jobService.js';

export async function getJobs(req, res, next) {
  try {
    const jobs = await jobService.getActiveJobs({
      search: req.query.search,
      category: req.query.category,
      jobType: req.query.jobType,
      workMode: req.query.workMode,
      location: req.query.location,
    });
    res.json(jobs);
  } catch (err) {
    next(err);
  }
}

export async function getJobById(req, res, next) {
  try {
    const job = await jobService.getActiveJobById(req.params.id);
    res.json(job);
  } catch (err) {
    next(err);
  }
}

export async function createJob(req, res, next) {
  try {
    const job = await jobService.createJob(req.user.id, req.body);
    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
}
