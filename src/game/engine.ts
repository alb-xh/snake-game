import _ from 'lodash';
import { EventEmitter } from 'node:events';

import { sleep } from '../utils.js';
import { Event, Field, Status, Theme, Direction } from './types.js';
import { Snake, Fruit, Frame, Keyboard } from './components/index.js';
import { directionTransitionsMap } from './constants.js';

export default class Engine extends EventEmitter {
  private status = Status.Idle
  private score = 0;

  private fruit: Fruit;
  private snake: Snake;
  private frame: Frame;


  constructor (
    private readonly field: Field,
    private readonly theme: Theme,
  ) {
    super();

    this.score = 0;
    this.fruit = new Fruit();
    this.snake = new Snake(this.field, this.fruit);
    this.frame = new Frame(this.field, this.snake, this.fruit);

    this.on(Event.Start, this.onStart.bind(this));
  }

  private async onStart () {
    if (this.status !== Status.Idle) throw new Error('Not allowed');

    const onDirection = Keyboard.onDirection(this.onDirection.bind(this));
    const onP = Keyboard.onKey({ name: 'p' }, this.onPKey.bind(this));

    this.on(Event.Reset, () => {
      this.status = Status.Idle;
      this.score = 0;

      Keyboard.offPress(onDirection);
      Keyboard.offPress(onP);

      this.fruit = new Fruit();
      this.snake = new Snake(this.field, this.fruit);
      this.frame = new Frame(this.field, this.snake, this.fruit);
    });

    this.emit(Event.UpdateFrameData, this.frame.draw(this.theme));
    await sleep(1000);

    this.run();
  }

  private onDirection (direction: Direction) {
    if (directionTransitionsMap[this.snake.direction].includes(direction)) {
      this.snake.setDirection(direction);
    }
  }

  private onPKey (): void {
    if (this.status === Status.Running) {
      this.status = Status.Paused;
      return;
    }

    if (this.status === Status.Paused) {
      this.status = Status.Running;

      return;
    }
  }

  private async run (): Promise<void> {
    if (this.status === Status.Running) throw new Error('Not allowed');
    this.status = Status.Running;

    while (this.status === Status.Running) {
      this.snake.move();
      this.emit(Event.UpdateFrameData, this.frame.draw(this.theme));

      await sleep(Math.max(10, 50 - Math.floor(this.score / 100)));
    }
  }
}