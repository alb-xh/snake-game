
export default class Fruit {
  constructor (
    public row = 0,
    public col = 0,
    public points = 10,
  ) {}

  move ([ row, col ]: [ number, number ]) {
    this.row = row;
    this.col = col;
  }
}
