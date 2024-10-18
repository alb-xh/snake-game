// Refactor later

import { resolve } from 'node:path';
import { writeFileSync } from 'node:fs';

import { isProduction } from './helpers.js';

export default class Debugger {
  static FILE = resolve(import.meta.dirname, 'debug.log');

  constructor (private readonly context: string) {}

  isEnabled () {
    return !isProduction();
  }

  async log (...messages: any[]): Promise<void> {
    if (!this.isEnabled()) { return; }

    writeFileSync(
      Debugger.FILE,
      messages.map((msg) => `\n${new Date().toISOString()}: ${this.context}: ${JSON.stringify(msg)}`).join('\n'),
      { flag: 'a+' },
    );
  }
}