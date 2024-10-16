import _ from 'lodash';

import { EventEmitter } from 'node:events';
import { clearInterval } from 'node:timers';

export enum Difficulty {
  Easy = 'easy',
  Normal = 'normal',
  Hard = 'hard'
}

export enum MapType {
  Field = 'field',
  Fence = 'fence',
  Maze = 'Maze',
}

export enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}

export enum Event {
  NewFrame = 'new_frame',
}

export type Settings = {
  difficulty: Difficulty,
  map: MapType,
  direction: Direction,
  width: number,
  height: number,
  snakeInitialSize: number,
}

export type Cell = { value: string, color: string, bgColor: string };
export type Frame = Array<Array<Cell | null>>;
export type State = { frame: Frame, ended: boolean };

const intervalMap: Record<Difficulty, number> = {
  [Difficulty.Easy]: 500,
  [Difficulty.Normal]: 300,
  [Difficulty.Hard]: 100,
};

const defaultSettings: Settings = {
  difficulty: Difficulty.Easy,
  map: MapType.Field,
  width: 120,
  height: 30,
  snakeInitialSize: 10,
  direction: Direction.Left,
}

export default class GameEngine extends EventEmitter {
  private settings: Settings = defaultSettings;
  private state: State | null = null;
  private interval: NodeJS.Timeout | null = null;

  public start (settings: Partial<Settings> = {}) {
    if (this.state) throw new Error('Not allowed');

    Object.assign(this.settings, settings);

    const frame: Frame = _.times(this.settings.height, () => (
      _.times(this.settings.width, () => null)
    ));

    this.state = { frame, ended: false };

    // maybe deep clone frame
    this.emit(Event.NewFrame, frame);

    // this.interval = setInterval(() => {}, intervalMap[this.settings.difficulty])
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