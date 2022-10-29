import React, { useReducer, createContext } from 'react';

import {
  TodoState,
  FilterState,
  EditingState,
  todoInitialState,
  filterInitialState,
  editingInitialState,
  TodoAction,
  FilterAction,
  EditingAction,
  todoReducer,
  filterReducer,
  editingReducer,
} from './store';
import Todos from './Todos';
import { TODO_APP_KEY } from './constants';

export interface TodoAppContextType {
  todo: TodoState;
  filter: FilterState;
  editing: EditingState;
  dispatchTodoAction: React.Dispatch<TodoAction>;
  dispatchFilterAction: React.Dispatch<FilterAction>;
  dispatchEditingAction: React.Dispatch<EditingAction>;
}

export const TodoAppContext = createContext<TodoAppContextType>(
  {} as TodoAppContextType
);

function initTodoApp() {
  let todo;
  try {
    let data = localStorage.getItem(TODO_APP_KEY) || '';
    todo = JSON.parse(data);
  } catch {
    console.log('unable to fetch data from localStorage');
  }

  if (!todo) {
    todo = todoInitialState;
  }
  return todo;
}

export default function TodoApp(): JSX.Element {
  const [todo, dispatchTodoAction] = useReducer<
    React.Reducer<TodoState, TodoAction>
  >(todoReducer, initTodoApp());
  const [filter, dispatchFilterAction] = useReducer<
    React.Reducer<FilterState, FilterAction>
  >(filterReducer, filterInitialState);
  const [editing, dispatchEditingAction] = useReducer<
    React.Reducer<EditingState, EditingAction>
  >(editingReducer, editingInitialState);

  return (
    <TodoAppContext.Provider
      value={{
        todo,
        filter,
        editing,
        dispatchTodoAction,
        dispatchFilterAction,
        dispatchEditingAction,
      }}
    >
      <Todos />
    </TodoAppContext.Provider>
  );
}
