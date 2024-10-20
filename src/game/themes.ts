import { Theme } from './types.js';

export const classicTheme: Theme = {
  empty: { value: ' ', color: '', bgColor: '' },
  fruit: { value: '0', color: 'black', bgColor: 'yellow' },
  snake: {
    left: {
      head: { value: '<', color: 'black', bgColor: 'red' },
      body: { value: '-', color: 'black', bgColor: 'green' },
      tail: { value: '>', color: 'black', bgColor: 'green' },
    },
    right: {
      head: { value: '>', color: 'black', bgColor: 'red' },
      body: { value: '-', color: 'black', bgColor: 'green' },
      tail: { value: '<', color: 'black', bgColor: 'green' },
    },
    up: {
      head: { value: '^', color: 'black', bgColor: 'red' },
      body: { value: '|', color: 'black', bgColor: 'green' },
      tail: { value: 'v', color: 'black', bgColor: 'green' },
    },
    down: {
      head: { value: 'v', color: 'black', bgColor: 'red' },
      body: { value: '|', color: 'black', bgColor: 'green' },
      tail: { value: '^', color: 'black', bgColor: 'green' },
    }
  }
};
