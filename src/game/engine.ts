import { EventEmitter } from 'node:events';;
import { sleep } from '../utils.js';
import { Event, Field, Status, Theme, Direction } from './types.js';
import { Snake, Fruit, Frame, Keyboard } from './components/index.js';
import { directionTransitionsMap } from './constants.js';

export default class Engine extends EventEmitter {
  public status: Status;
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
    this.setupBindings();
  }

  private async setupBindings () {
    Keyboard.onDirection((direction) => {
      if (this.status !== Status.Running) return;

      if (directionTransitionsMap[this.snake.direction].includes(direction)) {
        this.snake.setDirection(direction);
      }
    });
  }

  private async run () {
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
        this.status = Status.Terminated;
        this.emit(Event.Lose);
        return;
      }

      this.emit(Event.UpdateFrameData, this.frame.draw(this.theme));

      // hacky
      const timeout = Math.max(1, 24 - Math.floor(this.score / 10)) *
        ([ Direction.Up, Direction.Down ].includes(this.snake.direction) ? 2 : 1)

      await sleep(timeout)
    }
  }

  public async pause () {
    if (this.status === Status.Running) this.status = Status.Paused;
  }

  public async resume () {
    if (this.status === Status.Paused) this.run();
  }

  public async reset () {
    this.score = 0;
    this.fruit = new Fruit();
    this.snake = new Snake(this.field, this.fruit);
    this.frame = new Frame(this.field, this.snake, this.fruit);
    this.status = Status.Idle;
  }

  public async start (): Promise<void> {
    if (this.status !== Status.Idle) throw new Error('Not allowed');

    this.emit(Event.UpdateScore, this.score);
    this.emit(Event.UpdateFrameData, this.frame.draw(this.theme));

    return this.run();
  }
}