import _ from 'lodash';

import { Direction, Field } from "../types.js";
import Fruit from "./fruit.js";
import { fieldToSnakeSizeMap } from '../constants.js';

export default  class Snake {
  public readonly position: [ number, number ][] = [];
  public direction = Direction.Left;

  constructor (
    private readonly field: Field,
    private readonly fruit: Fruit,
  ) {
    const size = fieldToSnakeSizeMap.get(this.field);
    if (!size) {
      throw new Error('Initial snake size is not defined for the map');
    }

    const mRow = Math.floor(this.field.height / 2);
    const mCol = Math.floor(this.field.width / 2);

    const startCol = mCol - Math.floor(size/ 2);
    const endCol = mCol + Math.ceil(size / 2);

    this.position.push([ mRow, startCol ]);

    for (let col = startCol + 1; col < endCol; col++) {
      this.position.push([ mRow, col ]);
    }

    this.position.push([ mRow, endCol ]);

    const success = this.moveFruit();
    if (!success) {
      throw new Error('Failed to initialize fruit');
    }
  };

  setDirection (direction: Direction) {
    this.direction = direction;
  }

  move (): boolean {
    let [ hRow, hCol ] = this.position[0];

    if (this.direction === Direction.Up) hRow--;
    else if (this.direction === Direction.Down) hRow++;
    else if (this.direction === Direction.Left) hCol--;
    else hCol++;

    const [ newRow, newCol ] = this.field.resolvePosition([ hRow, hCol ]);

    if (!this.field.isAllowed([ newRow, newCol ])) {
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

    for (let row = 0; row < this.field.height; row++) {
      for (let col = 0; col < this.field.width; col++) {
        const poz = this.field.resolvePosition([ row, col ]);

        if (this.field.isAllowed(poz) && !snakePositions.has(poz.toString())) {
          availablePositions.push(poz);
        }
      }
    }

    if (availablePositions.length === 0) return false;

    this.fruit.move(availablePositions[_.random(availablePositions.length - 1)]);

    return true;
  }

}
