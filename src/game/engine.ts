import _ from 'lodash';
import { EventEmitter } from 'node:events';

import { Event, Field, Status, Theme } from './types.js';
import { Snake, Fruit, Frame, Keyboard } from './components/index.js';
import { directionTransitionsMap, fieldToSnakeSizeMap } from './constants.js';

export default class Engine extends EventEmitter {
  private status = Status.Idle;

  constructor (
    private readonly field: Field,
    private readonly theme: Theme,
  ) {
    super();

    this.on(Event.Start, this.onStart.bind(this));
    this.on(Event.Reset, this.onReset.bind(this));
  }


  private onStart () {
    if (this.status !== Status.Idle) throw new Error('Not allowed');

    const fruit = new Fruit();
    const snake = new Snake(this.field, fruit);
    const frame = new Frame(this.field, snake, fruit);

    const listener = Keyboard.onDirection((direction) => {
      if (directionTransitionsMap[snake.direction].includes(direction)) {
        snake.setDirection(direction);
      }
    });

    this.on(Event.Reset, () => Keyboard.offPress(listener));
    this.emit(Event.UpdateFrameData, frame.draw(this.theme));
  }

  private onReset () {
    this.status = Status.Idle;
  }
}