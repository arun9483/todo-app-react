import { ITodo } from './types';

export function getActiveCount(list: ITodo[]): number {
  const count: number = list.reduce((acc, item) => {
    if (!item.completed) {
      acc++;
    }
    return acc;
  }, 0);
  return count;
}
