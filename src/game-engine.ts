import _ from 'lodash';

import { EventEmitter } from 'node:events';

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
  StateUpdate = 'state_update',
}

type GameSettings = {
  difficulty: Difficulty,
  map: MapType,
  direction: Direction,
  width: number,
  height: number,
  snakeInitialSize: number,
}

type Cell = {
  value: string,
  color: string,
};

type Board = Array<Array<Cell | null>>;
type State = { board: Board, ended: boolean };

const intervalMap: Record<Difficulty, number> = {
  [Difficulty.Easy]: 500,
  [Difficulty.Normal]: 300,
  [Difficulty.Hard]: 100,
};

export default class GameEngine extends EventEmitter {
  private state: State | null = null;
  private interval: NodeJS.Timeout | null = null;
  public settings: GameSettings = {
    difficulty: Difficulty.Easy,
    map: MapType.Field,
    width: 120,
    height: 30,
    snakeInitialSize: 10,
    direction: Direction.Left,
  }

  constructor (options?: Partial<GameSettings>) {
    super();

    Object.assign(this.settings, options ?? {});
  };

  private setState (newState: State) {
    this.state = newState;

    // Maybe deep clone in future
    this.emit(Event.StateUpdate, newState);
  }

  private setNextState () {

  }

  public move (direction: Direction) {
    this.settings.direction = direction;
  }

  public start () {
    if (this.state) {
      throw new Error('Not allowed');
    }

    if (this.interval) {
      throw new Error('Unexpected');
    }

    const emptyRow = _.times(this.settings.width, () => null);
    const board = _.times(this.settings.height, () => Array.from(emptyRow));

    this.setState({ board, ended: false });

    this.interval = setInterval(() => {

    }, intervalMap[this.settings.difficulty])
  }
}