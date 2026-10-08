export class AuthError extends Error {
  constructor(message = 'Credenciales invalidas') {
    super(message);
    this.name = 'AuthError';
  }
}
