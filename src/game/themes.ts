import { Theme } from './types.js';

export const classic: Theme = {
  empty: { value: ' ', color: '', bgColor: '' },
  fruit: { value: '0', color: 'black', bgColor: 'yellow' },
  snake: {
    head: { value: '<3', color: 'black', bgColor: 'red' },
    body: { value: '=', color: 'black', bgColor: 'green' },
    tail: { value: '>', color: 'black', bgColor: 'green' },
  }
};
