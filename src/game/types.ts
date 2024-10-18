// Maybe rename most of them to more explicit

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
  UpdateFrameData = 'update_frame_data',
  End = 'end',
}

export type Settings = {
  difficulty: Difficulty,
  map: MapType,
  direction: Direction,
  width: number,
  height: number,
  snakeInitialSize: number,
}

export type Coordinates = [ number, number ];
export type FrameValue = { value: string, color: string, bgColor: string };
export type FrameData = Array<Array<FrameValue>>;
export type State = { frame: FrameData, ended: boolean };

export type Theme = {
  empty: FrameValue,
  fruit: FrameValue,
  snake: { head: FrameValue, body: FrameValue, tail: FrameValue },
}
