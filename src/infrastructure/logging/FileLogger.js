import fs from 'node:fs';
import path from 'node:path';
import { Logger } from '../../application/ports.js';

// Escribe en consola y en logs/auth.log (formato simple para Fail2Ban).
export class FileLogger extends Logger {
  constructor(file = 'logs/auth.log') {
    super();
    this.file = file;
    fs.mkdirSync(path.dirname(file), { recursive: true });
  }

  write(level, msg) {
    const line = `${new Date().toISOString()} ${level} ${msg}\n`;
    process.stdout.write(line);
    fs.appendFileSync(this.file, line);
  }

  info(msg) {
    this.write('INFO', msg);
  }

  warn(msg) {
    this.write('WARN', msg);
  }
}
