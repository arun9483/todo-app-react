import { ITodo } from '../../types';

export enum TodoActionKind {
  ADD = 'ADD',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
  TOGGLE_STATUS = 'TOGGLE_STATUS',
  TOGGLE_ALL = 'TOGGLE_ALL',
  CLEAR_COMPLETED = 'CLEAR_COMPLETED',
}

export const addTodo = (
  todo: ITodo
): {
  type: TodoActionKind.ADD;
  payload: ITodo;
} => ({
  type: TodoActionKind.ADD,
  payload: todo,
});

export const editTodo = (
  todo: ITodo
): {
  type: TodoActionKind.EDIT;
  payload: ITodo;
} => ({
  type: TodoActionKind.EDIT,
  payload: todo,
});

export const toggleTodo = (
  todo: ITodo
): {
  type: TodoActionKind.TOGGLE_STATUS;
  payload: ITodo;
} => ({
  type: TodoActionKind.TOGGLE_STATUS,
  payload: todo,
});

export const deleteTodo = (
  todo: ITodo
): {
  type: TodoActionKind.DELETE;
  payload: ITodo;
} => ({
  type: TodoActionKind.DELETE,
  payload: todo,
});

export const toggleAll = (): {
  type: TodoActionKind.TOGGLE_ALL;
} => ({
  type: TodoActionKind.TOGGLE_ALL,
});

export const clearCompleted = (): {
  type: TodoActionKind.CLEAR_COMPLETED;
} => ({
  type: TodoActionKind.CLEAR_COMPLETED,
});

export type TodoAction =
  | ReturnType<typeof addTodo>
  | ReturnType<typeof editTodo>
  | ReturnType<typeof toggleTodo>
  | ReturnType<typeof deleteTodo>
  | ReturnType<typeof toggleAll>
  | ReturnType<typeof clearCompleted>;
