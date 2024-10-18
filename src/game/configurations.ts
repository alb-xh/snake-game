import { Difficulty, MapType, Direction, Settings } from "./types.js";

export const intervalMap: Record<Difficulty, number> = {
  [Difficulty.Easy]: 500,
  [Difficulty.Normal]: 300,
  [Difficulty.Hard]: 100,
};

export const defaultSettings: Settings = {
  difficulty: Difficulty.Easy,
  map: MapType.Field,
  width: 120,
  height: 30,
  snakeInitialSize: 10,
  direction: Direction.Left,
}