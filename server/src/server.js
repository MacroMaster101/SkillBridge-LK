import './config/env.js';
import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Hitting the bare origin — in a browser preview or on the deployed URL —
// should say what this service is rather than Express's "Cannot GET /".
app.get('/', (_req, res) => {
  res.json({
    name: 'SkillBridge LK API',
    status: 'ok',
    health: '/health',
    endpoints: ['/api/jobs', '/api/skills', '/api/candidates', '/api/employers', '/api/applications', '/api/admin'],
  });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'SkillBridge LK API is running' });
});

app.use('/api', apiRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
