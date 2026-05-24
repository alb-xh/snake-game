// Maybe rename most of them to more explicit

export enum Status {
  Idle = 'idle',
  Paused = 'paused',
  Running = 'running',
  Terminated = 'terminated',
};

export enum Event {
  Lose = 'lose',
  UpdateFrameData = 'update_frame_data',
  UpdateScore = 'update_score',
};

export enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
};

export enum Page {
  Help = 'help',
  Game = 'game',
  Edit = 'edit',
  Leaderboard = 'leaderboard'
}

export interface Field {
  height: number;
  width: number;

  isAllowed (position: [ number, number ]): boolean;

  resolvePosition (position: [ number, number ]): [ number, number ];
}

export type FrameValue = { value: string, color: string, bgColor: string };
export type FrameData = Array<Array<FrameValue>>;

export type Theme = {
  empty: FrameValue,
  fruit: FrameValue,
  snake: Record<Direction, { head: FrameValue, body: FrameValue, tail: FrameValue }>,
}

export type Key =  { name: string, ctrl?: boolean, shift?: boolean, sequence?: string };
export type Listener = (...args: any[]) => void;