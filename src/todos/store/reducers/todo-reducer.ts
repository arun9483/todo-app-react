import { ITodo } from '../../types';
import { TodoState } from '../initial-states';
import { TodoAction, TodoActionKind } from './../actions/todo-actions';

export const todoReducer = (state: TodoState, action: TodoAction) => {
  let list = state.list;
  let newList = [];
  switch (action.type) {
    case TodoActionKind.ADD:
      newList = [...list, action.payload];
      return { list: newList };
    case TodoActionKind.EDIT:
      newList = list.map((item: ITodo) => {
        if (item.id === action.payload.id) {
          return { ...item, title: action.payload.title };
        }
        return item;
      });
      return { list: newList };
    case TodoActionKind.DELETE:
      newList = list.filter((item: ITodo) => {
        return item.id !== action.payload.id;
      });
      return { list: newList };
    case TodoActionKind.TOGGLE_STATUS:
      newList = list.map((item: ITodo) => {
        if (item.id === action.payload.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      });
      return { list: newList };
    case TodoActionKind.TOGGLE_ALL:
      let idx = list.findIndex((todo) => !todo.completed);
      newList = list.map((item: ITodo) => {
        return { ...item, completed: idx > -1 };
      });
      return { list: newList };
    case TodoActionKind.CLEAR_COMPLETED:
      newList = list.filter((item: ITodo) => {
        return !item.completed;
      });
      return { list: newList };
    default:
      return state;
  }
};
