import _ from 'lodash';

import readline from 'node:readline';
import process from 'node:process';

import { Direction, Key, Listener } from '../types.js';

export default class Keyboard {
  static onPress (cb: (key:  Key) => void): Listener {
    readline.emitKeypressEvents(process.stdin);

    if (process.stdin.isTTY) process.stdin.setRawMode(true);

    function listener (chunk: any, key: Key) {
      if (!key) return;
      if (key.name === 'c' && key.ctrl === true) return process.exit();

      cb(key);
    }

    process.stdin.on('keypress', listener);

    return listener;
  }

  static onKey (key: Key, cb: () => {}): Listener {
    return Keyboard.onPress((k) => {
      if (_.isEqual(k, key)) cb();
    })
  }

  static onDirection (cb: (direction: Direction) => void): Listener {
    return Keyboard.onPress((key) => {
      if (Object.values(Direction).includes(key.name as Direction)) {
        cb(key.name as Direction);
      }
    })
  }

  static offPress (listener: Listener): void {
    process.stdin.off('keypress', listener);
  }
}