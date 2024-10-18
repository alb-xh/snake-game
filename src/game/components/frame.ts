import _ from 'lodash'

import { FrameData, Theme } from "../types.js";
import { BaseMap } from "./maps/index.js";
import Snake from './snake.js';
import Fruit from './fruit.js';

export default class Frame {
  constructor (
    private readonly map: BaseMap,
    private readonly snake: Snake,
    private readonly fruit: Fruit,
  ) {}

  draw (theme: Theme): FrameData {
    const data: FrameData = _.times(this.map.height, () => _.times(this.map.width, () => theme.empty));

    data[this.fruit.row][this.fruit.col] = theme.fruit;

    for (let i = 0; i < this.snake.position.length; i++) {
      const [ row, col ] = this.snake.position[i]

     if (i === 0) data[row][col] = theme.snake.head;
     else if (i === (this.snake.position.length - 1)) data[row][col] = theme.snake.tail;
     else data[row][col] = theme.snake.body;
    }

    return data;
  }
}