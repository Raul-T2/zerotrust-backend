import jwt from 'jsonwebtoken';
import { TokenService } from '../../application/ports.js';

export class JwtTokenService extends TokenService {
  constructor({ secret, expiresIn }) {
    super();
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  sign(payload) {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn, algorithm: 'HS256' });
  }

  verify(token) {
    // Lanza error si el token es invalido o expiro.
    return jwt.verify(token, this.secret, { algorithms: ['HS256'] });
  }
}
