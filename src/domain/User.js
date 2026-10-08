// Entidad de dominio: no sabe nada de Express, JWT ni bases de datos.
export class User {
  constructor({ id, username, passwordHash, role }) {
    this.id = id;
    this.username = username;
    this.passwordHash = passwordHash;
    this.role = role;
  }

  toPublic() {
    return { id: this.id, username: this.username, role: this.role };
  }
}
