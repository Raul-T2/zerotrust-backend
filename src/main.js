import 'dotenv/config';
import { User } from './domain/User.js';
import { LoginUseCase } from './application/LoginUseCase.js';
import { GetDashboardUseCase } from './application/GetDashboardUseCase.js';
import { InMemoryUserRepository } from './infrastructure/persistence/InMemoryUserRepository.js';
import { BcryptPasswordHasher } from './infrastructure/security/BcryptPasswordHasher.js';
import { JwtTokenService } from './infrastructure/security/JwtTokenService.js';
import { FileLogger } from './infrastructure/logging/FileLogger.js';
import { createApp } from './infrastructure/http/createApp.js';

const { PORT = 3000, JWT_SECRET, JWT_EXPIRES_IN = '1h', CORS_ORIGIN, DEMO_USER, DEMO_PASSWORD } = process.env;

if (!JWT_SECRET || !DEMO_USER || !DEMO_PASSWORD) {
  console.error('Falta configurar .env (JWT_SECRET, DEMO_USER, DEMO_PASSWORD). Copia .env.example a .env');
  process.exit(1);
}

// 1) Adaptadores
const passwordHasher = new BcryptPasswordHasher();
const userRepository = new InMemoryUserRepository([
  new User({ id: 1, username: DEMO_USER, passwordHash: passwordHasher.hash(DEMO_PASSWORD), role: 'admin' }),
]);
const tokenService = new JwtTokenService({ secret: JWT_SECRET, expiresIn: JWT_EXPIRES_IN });
const logger = new FileLogger('logs/auth.log');

// 2) Casos de uso (reciben puertos)
const loginUseCase = new LoginUseCase({ userRepository, passwordHasher, tokenService, logger });
const getDashboardUseCase = new GetDashboardUseCase();

// 3) Servidor HTTP
const app = createApp({ loginUseCase, getDashboardUseCase, tokenService, corsOrigin: CORS_ORIGIN });
app.listen(PORT, () => logger.info(`API escuchando en puerto ${PORT}`));
