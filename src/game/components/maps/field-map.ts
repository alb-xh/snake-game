import BaseMap from "./base-map.js";

export default class FieldMap extends BaseMap {
  // No obstacles
  isAllowed (poz: [ number, number ]) {
    return true;
  }

  resolvePosition ([ row, col ]: [ number, number ]): [ number, number ] {
    let newRow, newCol;

    if (row < 0) newRow = this.height + (row % this.height);
    else if (row >= this.height) newRow = row % this.height;
    else newRow = row;

    if (col < 0) newCol = this.width + (col % this.width);
    else if (col >= this.width) newCol = col % this.width;
    else newCol = col;

    return [ newRow, newCol ]
  }
}
