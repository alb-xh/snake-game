import { Difficulty, MapType, Direction, Settings } from "./types.js";

export const intervalMap: Record<Difficulty, number> = {
  [Difficulty.Easy]: 100,
  [Difficulty.Normal]: 50,
  [Difficulty.Hard]: 10,
};

export const defaultSettings: Settings = {
  difficulty: Difficulty.Easy,
  map: MapType.Field,
  width: 120,
  height: 30,
  snakeInitialSize: 10,
  direction: Direction.Left,
}