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
  list: [],
};
export const filterInitialState: FilterState = { filter: 0 };
export const editingInitialState: EditingState = { editing: '' };
