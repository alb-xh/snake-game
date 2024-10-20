import _ from 'lodash'

import { Field, FrameData, Theme } from "../types.js";
import Snake from './snake.js';
import Fruit from './fruit.js';

export default class Frame {
  constructor (
    private readonly field: Field,
    private readonly snake: Snake,
    private readonly fruit: Fruit,
  ) {}

  draw (theme: Theme): FrameData {
    const data: FrameData = _.times(this.field.height, () => _.times(this.field.width, () => theme.empty));
    const snakeTheme = theme.snake[this.snake.direction];

    data[this.fruit.row][this.fruit.col] = theme.fruit;

    for (let i = 0; i < this.snake.position.length; i++) {
      const [ row, col ] = this.snake.position[i]

     if (i === 0) data[row][col] = snakeTheme.head;
     else if (i === (this.snake.position.length - 1)) data[row][col] = snakeTheme.tail;
     else data[row][col] = snakeTheme.body;
    }

    return data;
  }
}