import bcrypt from 'bcryptjs';
import { PasswordHasher } from '../../application/ports.js';

export class BcryptPasswordHasher extends PasswordHasher {
  hash(plain) {
    return bcrypt.hashSync(plain, 10);
  }

  async compare(plain, hash) {
    return bcrypt.compare(plain, hash);
  }
}
