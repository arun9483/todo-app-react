import { ITodo } from '../../types';

export interface TodoState {
  list: ITodo[];
}

export interface FilterState {
  filter: number;
}

export interface EditingState {
  editing: string;
}

export const todoInitialState: TodoState = {
  list: [
    {
      id: 'a1',
      title: 'a-one',
      completed: true,
    },
    {
      id: 'a2',
      title: 'a-two',
      completed: false,
    },
    {
      id: 'a3',
      title: 'a-three',
      completed: false,
    },
    {
      id: 'a4',
      title: 'a-four',
      completed: true,
    },
  ],
};
export const filterInitialState: FilterState = { filter: 0 };
export const editingInitialState: EditingState = { editing: '' };
