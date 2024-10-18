import _ from 'lodash';
import { EventEmitter } from 'node:events';
import { clearInterval } from 'node:timers';

import Debugger from '../debugger.js';
import { Settings, Direction, State, Event, Key } from './types.js';
import { defaultSettings, intervalMap } from './configurations.js';
import { FieldMap, Snake, Fruit, Frame, KeyPress } from './components/index.js';
import { classic } from './themes.js';

const debug = new Debugger('Engine');

export default class Engine extends EventEmitter {
  private settings: Settings = defaultSettings;
  private state: State | null = null;
  private interval: NodeJS.Timeout | null = null;

  public start (settings: Partial<Settings> = {}) {
    if (this.state) throw new Error('Not allowed');

    Object.assign(this.settings, settings);

    const fruit = new Fruit();
    const map = new FieldMap(this.settings.height, this.settings.width);
    const snake = new Snake(map, fruit, this.settings.snakeInitialSize);
    const frame = new Frame(map, snake, fruit);

    snake.initialize();
    KeyPress.on(this.onKeyPress.bind(this));
    this.emit(Event.UpdateFrameData, frame.draw(classic, this.settings.direction));

    this.interval = setInterval(() => {
      snake.move(this.settings.direction);
      this.emit(Event.UpdateFrameData, frame.draw(classic, this.settings.direction));
    }, intervalMap[this.settings.difficulty]);
  }

  public reset () {
    KeyPress.off(this.onKeyPress.bind(this));

    for (const event of Object.values(Event)) this.removeAllListeners(event);
    if (this.interval) clearInterval(this.interval);

    this.interval = null;
    this.state = null;
    this.settings = defaultSettings;
  }

  private onKeyPress (key: Key) {
    switch (key.name) {
      case Direction.Up: {
        if ([ Direction.Left, Direction.Right ].includes(this.settings.direction)) {
          this.settings.direction = Direction.Up;
        }

        return;
      }

      case Direction.Down: {
        if ([ Direction.Left, Direction.Right ].includes(this.settings.direction)) {
          this.settings.direction = Direction.Down;
        }

        return;
      }

      case Direction.Left: {
        if ([ Direction.Up, Direction.Down ].includes(this.settings.direction)) {
          this.settings.direction = Direction.Left;
        }

        return;
      }

      case Direction.Right: {
        if ([ Direction.Up, Direction.Down ].includes(this.settings.direction)) {
          this.settings.direction = Direction.Right;
        }

        return;
      }
    }

  }
}