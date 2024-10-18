import _ from 'lodash';

import { Direction } from "../types.js";
import { BaseMap } from './maps/index.js'
import Fruit from "./fruit.js";

export default  class Snake {
  public readonly position: [ number, number ][] = [];

  constructor (
    private readonly map: BaseMap,
    private readonly fruit: Fruit,
    private readonly initialSize: number,
  ) {};

  initialize (): void {
    const mRow = Math.floor(this.map.height / 2);
    const mCol = Math.floor(this.map.width / 2);

    const startCol = mCol - Math.floor(this.initialSize / 2);
    const endCol = mCol + Math.ceil(this.initialSize / 2);

    this.position.push([ mRow, startCol ]);

    for (let col = startCol + 1; col < endCol; col++) {
      this.position.push([ mRow, col ]);
    }

    this.position.push([ mRow, endCol ]);

    const success = this.moveFruit();
    if (!success) {
      throw new Error('Failed to initialize fruit');
    }
  }

  move (direction: Direction): boolean {
    let [ hRow, hCol ] = this.position[0];

    if (direction === Direction.Up) hRow--;
    else if (direction === Direction.Down) hRow++;
    else if (direction === Direction.Left) hCol--;
    else hCol++;

    const [ newRow, newCol ] = this.map.resolvePosition([ hRow, hCol ]);

    if (!this.map.isAllowed([ newRow, newCol ])) {
      return false;
    }

    this.position.unshift([ newRow, newCol ]);

    if (this.fruit.row === newRow && this.fruit.col === newRow) this.moveFruit();
    else this.position.pop();

    return true;
  }

  private moveFruit (): boolean {
    const availablePositions = [];
    const snakePositions = new Set(this.position.map((arr) => arr.toString()))

    for (let row = 0; row < this.map.height; row++) {
      for (let col = 0; col < this.map.width; col++) {
        const poz = this.map.resolvePosition([ row, col ]);

        if (this.map.isAllowed(poz) && !snakePositions.has(poz.toString())) {
          availablePositions.push(poz);
        }
      }
    }

    if (availablePositions.length === 0) return false;

    this.fruit.move(availablePositions[_.random(availablePositions.length - 1)]);

    return true;
  }
}
