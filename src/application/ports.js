// PUERTOS (interfaces). La logica de negocio solo conoce estos contratos.
// Los adaptadores de /infrastructure los implementan.

export class UserRepository {
  async findByUsername(_username) {
    throw new Error('No implementado');
  }
}

export class PasswordHasher {
  async compare(_plain, _hash) {
    throw new Error('No implementado');
  }
}

export class TokenService {
  sign(_payload) {
    throw new Error('No implementado');
  }
  verify(_token) {
    throw new Error('No implementado');
  }
}

export class Logger {
  info(_msg) {
    throw new Error('No implementado');
  }
  warn(_msg) {
    throw new Error('No implementado');
  }
}
