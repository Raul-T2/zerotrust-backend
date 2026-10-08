import { AuthError } from './errors.js';

// Caso de uso: iniciar sesion. Solo depende de puertos, no de librerias.
export class LoginUseCase {
  constructor({ userRepository, passwordHasher, tokenService, logger }) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.tokenService = tokenService;
    this.logger = logger;
  }

  async execute({ username, password, ip }) {
    const user = username ? await this.userRepository.findByUsername(username) : null;
    const valid = user && password
      ? await this.passwordHasher.compare(password, user.passwordHash)
      : false;

    if (!valid) {
      // Esta linea es la que leera Fail2Ban mas adelante.
      this.logger.warn(`LOGIN_FAILED ip=${ip} user=${username ?? '-'}`);
      throw new AuthError();
    }

    this.logger.info(`LOGIN_OK ip=${ip} user=${user.username}`);
    const token = this.tokenService.sign({
      sub: user.id,
      username: user.username,
      role: user.role,
    });
    return { token, user: user.toPublic() };
  }
}
