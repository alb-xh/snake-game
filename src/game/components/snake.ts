import _ from 'lodash';

import { Direction, Field } from "../types.js";
import { fieldToSnakeSizeMap } from '../constants.js';
import Fruit from "./fruit.js";
import { debug } from '../../utils.js';

export default  class Snake {
  public readonly position: [ number, number ][] = [];
  public direction = Direction.Left;
  public fruits: number = 0;

  constructor (
    private readonly field: Field,
    private readonly fruit: Fruit,
  ) {
    const size = fieldToSnakeSizeMap.get(this.field);
    if (!size) throw new Error('Initial snake size is not defined');

    const mRow = Math.floor(this.field.height / 2)
    const mCol = Math.floor(this.field.width / 2);

    const startCol = mCol - (Math.ceil(size / 2) - 1);
    const endCol = mCol + Math.floor(size / 2);

    debug(mRow, mCol, startCol, endCol);


    this.position.push([ mRow, startCol ]);

    for (let col = startCol + 1; col < endCol; col++) {
      this.position.push([ mRow, col ]);
    }

    this.position.push([ mRow, endCol ]);
    debug(this.position.length);

    if (!this.moveFruit())throw new Error('Failed to initialize fruit');
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

    // Crashed on field
    if (!this.field.isAllowed([ newRow, newCol ])) {
      return false;
    }

    const capturedFruit = this.fruit.row === newRow && this.fruit.col === newCol;

    for (let [ row, col ] of this.position.slice(0, !capturedFruit ?  -1 : undefined)) {
      if (newRow === row && newCol === col) return false;
    }

    if (capturedFruit) {
      this.fruits++;
      if (!this.moveFruit()) return false;
    } else {
      this.position.pop();
    }

    this.position.unshift([ newRow, newCol ]);

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
