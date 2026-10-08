import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { AuthError } from '../../application/errors.js';
import { createAuthMiddleware } from './authMiddleware.js';

// Adaptador HTTP (Express). Traduce HTTP <-> casos de uso.
export function createApp({ loginUseCase, getDashboardUseCase, tokenService, corsOrigin }) {
  const app = express();
  app.set('trust proxy', true); // detras de Nginx, req.ip toma X-Forwarded-For
  app.use(helmet());
  app.use(cors({ origin: corsOrigin }));
  app.use(express.json({ limit: '10kb' }));

  const requireAuth = createAuthMiddleware(tokenService);

  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

  app.post('/api/auth/login', async (req, res, next) => {
    try {
      const { username, password } = req.body ?? {};
      const result = await loginUseCase.execute({ username, password, ip: req.ip });
      res.json(result);
    } catch (err) {
      next(err);
    }
  });

  app.get('/api/dashboard', requireAuth, (req, res) => {
    res.json(getDashboardUseCase.execute(req.user));
  });

  app.use((err, _req, res, _next) => {
    if (err instanceof AuthError) {
      return res.status(401).json({ error: err.message });
    }
    console.error(err);
    return res.status(500).json({ error: 'Error interno' });
  });

  return app;
}
