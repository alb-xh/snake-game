import { Field } from "./types.js";

export const classicField: Field = {
  height: 20,
  width: 80,
  isAllowed () { return true },   // No obstacles
  resolvePosition ([ row, col ]) {
    let newRow, newCol;

    if (row < 0) newRow = this.height + (row % this.height);
    else if (row >= this.height) newRow = row % this.height;
    else newRow = row;

    if (col < 0) newCol = this.width + (col % this.width);
    else if (col >= this.width) newCol = col % this.width;
    else newCol = col;

    return [ newRow, newCol ]
  },
};

