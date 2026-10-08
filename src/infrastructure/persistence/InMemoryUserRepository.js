import { UserRepository } from '../../application/ports.js';

// Adaptador de persistencia. Mas adelante puedes cambiarlo por MySQL/SQLite
// sin tocar el dominio ni los casos de uso.
export class InMemoryUserRepository extends UserRepository {
  constructor(users = []) {
    super();
    this.users = users;
  }

  async findByUsername(username) {
    return this.users.find((u) => u.username === username) ?? null;
  }
}
