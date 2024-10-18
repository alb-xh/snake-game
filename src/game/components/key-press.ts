import readline from 'node:readline';
import process from 'node:process';

import { Key } from '../types.js';

export default class KeyPress {
  static on (cb: (key:  Key) => void) {
    readline.emitKeypressEvents(process.stdin);

    if (process.stdin.isTTY) process.stdin.setRawMode(true);

    process.stdin.on('keypress', (chunk, key) => {
      if (!key) return;
      if (key.name === 'c' && key.ctrl === true) return process.exit();

      cb(key);
    });
  }

  static off (cb: (key:  Key) => void) {
    process.stdin.off('keypress', cb)
  }
}