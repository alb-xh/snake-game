import { Direction } from './types.js';
import { classicField } from "./fields.js";

export const fieldToSnakeSizeMap = new Map()
  .set(classicField, 25);

export const directionTransitionsMap: Record<Direction, Direction[]> = {
  [Direction.Up]: [ Direction.Right, Direction.Left ],
  [Direction.Down]: [ Direction.Right, Direction.Left ],
  [Direction.Right]: [ Direction.Up, Direction.Down ],
  [Direction.Left]: [ Direction.Up, Direction.Down ],
};
