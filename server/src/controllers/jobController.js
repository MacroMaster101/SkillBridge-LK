import { listJobs } from "../services/jobService.js";

export async function getJobs(req, res) {
  try {
    const jobs = await listJobs(req.query, req.user.id);
    res.json(jobs);
  } catch (e) {
    res.status(500).json({ message: "Unable to load jobs." });
  }
}