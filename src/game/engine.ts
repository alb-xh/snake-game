import _ from 'lodash';
import { EventEmitter } from 'node:events';
import { clearInterval } from 'node:timers';

import { Settings, Direction, State, Event } from './types.js';
import { defaultSettings, intervalMap } from './configurations.js';
import { FieldMap, Snake, Fruit, Frame } from './components/index.js';
import { classic } from './themes.js';


export default class Engine extends EventEmitter {
  private settings: Settings = defaultSettings;
  private state: State | null = null;
  private interval: NodeJS.Timeout | null = null;

  constructor () {
    super();
  }

  public start (settings: Partial<Settings> = {}) {
    if (this.state) throw new Error('Not allowed');

    Object.assign(this.settings, settings);

    const fruit = new Fruit();
    const map = new FieldMap(this.settings.height, this.settings.width);
    const snake = new Snake(map, fruit, this.settings.snakeInitialSize);
    const frame = new Frame(map, snake, fruit);

    snake.initialize();
    const data = frame.draw(classic);


    // this.interval = setInterval(() => {}, intervalMap[this.settings.difficulty]);
    this.emit(Event.UpdateFrameData, data);
  }

  public reset () {
    for (const event of Object.values(Event)) this.removeAllListeners(event);
    if (this.interval) clearInterval(this.interval);

    this.interval = null;
    this.state = null;
    this.settings = defaultSettings;
  }

  public move (direction: Direction) {
    this.settings.direction = direction;
  }
}