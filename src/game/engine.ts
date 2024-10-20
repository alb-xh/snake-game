import _ from 'lodash';
import { EventEmitter } from 'node:events';

import { sleep } from '../utils.js';
import { Event, Field, Status, Theme, Direction } from './types.js';
import { Snake, Fruit, Frame, Keyboard } from './components/index.js';
import { directionTransitionsMap } from './constants.js';

export default class Engine extends EventEmitter {
  private status: Status;
  private score: number;
  private fruit: Fruit;
  private snake: Snake;
  private frame: Frame;

  constructor (
    private readonly field: Field,
    private readonly theme: Theme,
  ) {
    super();

    this.score = 0;
    this.status = Status.Idle;
    this.fruit = new Fruit();
    this.snake = new Snake(this.field, this.fruit);
    this.frame = new Frame(this.field, this.snake, this.fruit);
    this.once(Event.Start, this.onStart.bind(this));
  }

  private async onStart () {
    if (this.status !== Status.Idle) throw new Error('Not allowed');

    const onDirection = Keyboard.onDirection(this.onDirection.bind(this));
    const onP = Keyboard.onKey({ name: 'p' }, this.onPKey.bind(this));

    this.once(Event.Reset, () => {
      Keyboard.offPress(onDirection);
      Keyboard.offPress(onP);

      this.score = 0;
      this.status = Status.Idle;
      this.fruit = new Fruit();
      this.snake = new Snake(this.field, this.fruit);
      this.frame = new Frame(this.field, this.snake, this.fruit);
      this.once(Event.Start, this.onStart.bind(this));
    });

    this.emit(Event.UpdateScore, this.score);
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
      const success = this.snake.move();
      const newScore = this.snake.fruits * this.fruit.points;

      if (this.score !== newScore) {
        this.score = newScore;
        this.emit(Event.UpdateScore, this.score);
      }

      if (!success) {
        this.emit(Event.Lose);
        this.emit(Event.Reset);

        return;
      }

      this.emit(Event.UpdateFrameData, this.frame.draw(this.theme));

      await sleep(Math.max(1, 30 - Math.floor(this.score / 10)));
    }
  }
}